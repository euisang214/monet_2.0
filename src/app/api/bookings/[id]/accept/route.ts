
// POST /api/bookings/[id]/accept
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getFreeBusy } from '@/lib/google';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = await prisma.booking.update({
    where: { id },
    data: { status: 'ACCEPTED', acceptedAt: new Date() },
  });

  // fetch candidate Google calendar free/busy for next 7 days
  let freeBusy: unknown = null;
  const account = await prisma.account.findFirst({
    where: { userId: booking.candidateId, provider: 'google' },
  });
  if (account?.access_token && account?.refresh_token) {
    const timeMin = new Date().toISOString();
    const timeMax = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    try {
      freeBusy = await getFreeBusy(account.access_token, account.refresh_token, timeMin, timeMax);
    } catch (err) {
      console.error('Failed to fetch free/busy', err);
    }
  }

  return NextResponse.json({ booking, freeBusy });
}
