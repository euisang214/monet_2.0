
/**
 * Background jobs for nudges, QC gating, auto-refunds.
 * Wire these to your cron/queue (e.g., Vercel Cron, Inngest, or a worker dyno).
 */

import { prisma } from '@/lib/prisma';
import { refundPaymentIntent, transferToPro } from '@/lib/stripe';

export async function runPostCallSweep(now = new Date()) {
  // 1) Mark bookings that ended to COMPLETED_PENDING_FEEDBACK (if not already)
  const ended = await prisma.booking.updateMany({
    where: { endAt: { lt: now }, status: 'ACCEPTED' },
    data: { status: 'COMPLETED_PENDING_FEEDBACK' },
  });
  return ended.count;
}

export async function runFeedbackNudges() {
  const now = new Date();
  const bookings = await prisma.booking.findMany({
    where: { status: 'COMPLETED_PENDING_FEEDBACK', endAt: { not: null } },
    select: { id: true, professionalId: true, endAt: true },
  });

  let queued = 0;
  for (const b of bookings) {
    const end = b.endAt!;
    const reminders = [1, 24, 48].map(h => new Date(end.getTime() + h * 60 * 60 * 1000));
    for (const scheduledFor of reminders) {
      if (scheduledFor > now) {
        await prisma.notification.create({
          data: {
            userId: b.professionalId,
            type: 'FEEDBACK_REMINDER',
            payload: { bookingId: b.id },
            scheduledFor,
          },
        });
        queued++;
      }
    }
  }

  return { queued };
}

export async function runAutoRefunds(now = new Date()) {
  // Auto-refund bookings where feedback missing or QC failed: after 48h + 24h grace
  const cutoff = new Date(now.getTime() - 72*60*60*1000);
  const candidates = await prisma.booking.findMany({
    where: {
      status: 'COMPLETED_PENDING_FEEDBACK',
      endAt: { lt: cutoff },
      payment: { isNot: null },
    },
    include: { payment: true },
  });

  let count = 0;
  for (const b of candidates) {
    if (!b.payment?.stripePaymentIntentId) continue;
    await refundPaymentIntent(b.payment.stripePaymentIntentId);
    await prisma.booking.update({ where: { id: b.id }, data: { status: 'REFUNDED' } });
    await prisma.payment.update({ where: { bookingId: b.id }, data: { status: 'REFUNDED', refundedAt: new Date() } });
    count++;
  }
  return count;
}

export async function runPayouts() {
  // Payout any pending payouts that passed QC
  const payouts = await prisma.payout.findMany({ where: { status: 'PENDING' }, include: { booking: { include: { payment: true } } } });
  let paid = 0;
  for (const p of payouts) {
    if (!p.booking?.payment?.stripePaymentIntentId) continue;
    await transferToPro({
      paymentIntentId: p.booking.payment.stripePaymentIntentId,
      proStripeAccountId: p.proStripeAccountId,
      amountCents: p.amountNet,
    });
    await prisma.payout.update({ where: { bookingId: p.bookingId }, data: { status: 'PAID', paidAt: new Date() } });
    await prisma.payment.update({ where: { bookingId: p.bookingId }, data: { status: 'RELEASED', releasedAt: new Date() } });
    paid++;
  }
  return paid;
}
