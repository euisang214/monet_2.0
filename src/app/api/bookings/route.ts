
// POST /api/bookings
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { professionalId } = body;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const candidateId = session.user.id;

  const booking = await prisma.booking.create({
    data: {
      candidateId,
      professionalId,
      status: 'REQUESTED',
      createdBy: candidateId,
    },
  });

  // placeholder notification
  console.log(`Notify professional ${professionalId} of booking ${booking.id}`);

  return NextResponse.json({ booking });
}
