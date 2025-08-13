
// POST /api/bookings/[id]/accept
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const booking = await prisma.booking.update({
    where: { id },
    data: { status: 'ACCEPTED', acceptedAt: new Date() },
  });
  // TODO: fetch candidate free/busy; return for scheduling UI
  return NextResponse.json({ booking });
}
