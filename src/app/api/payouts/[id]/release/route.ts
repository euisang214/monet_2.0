
// POST /api/payouts/[id]/release  (bookingId)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { transferToPro } from '@/src/lib/stripe';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const bookingId = params.id;
  const booking = await prisma.booking.findUnique({ where: { id: bookingId }, include: { payout: true, payment: true } });
  if (!booking || !booking.payout || !booking.payment) return new Response('Not found', { status: 404 });

  const res = await transferToPro({
    paymentIntentId: booking.payment.stripePaymentIntentId!,
    proStripeAccountId: booking.payout.proStripeAccountId,
    amountCents: booking.payout.amountNet,
  });

  await prisma.payout.update({ where: { bookingId }, data: { status: 'PAID', paidAt: new Date() } });
  await prisma.payment.update({ where: { bookingId }, data: { status: 'RELEASED', releasedAt: new Date() } });

  return NextResponse.json({ transfer: res });
}
