
// POST /api/bookings/[id]/cancel
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { computeCancellationPolicy } from '@/src/domain/booking';
import { refundPaymentIntent } from '@/src/lib/stripe';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const body = await req.json();
  const { who } = body as { who: 'candidate'|'professional' };

  const booking = await prisma.booking.findUnique({ where: { id }, include: { payment: true } });
  if (!booking || !booking.payment) return new Response('Not found', { status: 404 });

  const startAt = booking.startAt ?? new Date(Date.now() + 3*60*60*1000);
  const priceCents = booking.payment.amountGross;
  const outcome = computeCancellationPolicy({ who, startAt, now: new Date(), priceCents });

  if (outcome.refundToCandidateCents > 0) {
    await refundPaymentIntent(booking.payment.stripePaymentIntentId!, outcome.refundToCandidateCents);
  }

  await prisma.booking.update({
    where: { id },
    data: { status: 'CANCELLED', cancelledAt: new Date() },
  });

  return NextResponse.json({ outcome });
}
