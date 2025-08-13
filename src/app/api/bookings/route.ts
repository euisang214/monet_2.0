
// POST /api/bookings
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { professionalId } = body;

  // TODO: require auth; derive candidateId from session
  const candidateId = body.candidateId;

  const booking = await prisma.booking.create({
    data: {
      candidateId,
      professionalId,
      status: 'REQUESTED',
      createdBy: candidateId,
    },
  });

  // TODO: notify professional
  return NextResponse.json({ booking });
}
