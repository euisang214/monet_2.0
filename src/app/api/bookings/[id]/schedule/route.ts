
// POST /api/bookings/[id]/schedule
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { createZoomMeeting } from '@/src/lib/zoom';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const body = await req.json();
  const { startAtISO, endAtISO, timezone } = body;

  const zoom = await createZoomMeeting({
    topic: 'Monet Expert Call',
    start_time: startAtISO,
    duration: 30,
    timezone,
  });

  const booking = await prisma.booking.update({
    where: { id },
    data: {
      startAt: new Date(startAtISO),
      endAt: new Date(endAtISO),
      zoomMeetingId: zoom.id?.toString() ?? null,
      zoomJoinUrl: zoom.join_url ?? null,
    },
  });

  // TODO: create Google Calendar events for both parties

  return NextResponse.json({ booking, zoom });
}
