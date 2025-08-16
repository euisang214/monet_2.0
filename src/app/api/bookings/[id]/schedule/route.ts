
// POST /api/bookings/[id]/schedule
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createZoomMeeting } from '@/lib/zoom';
import { createEvent } from '@/lib/google';
import type { calendar_v3 } from 'googleapis';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { startAtISO, endAtISO, timezone } = body;

  const existing = await prisma.booking.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  const zoom = await createZoomMeeting({
    topic: 'Monet Expert Call',
    start_time: startAtISO,
    duration: 30,
    timezone,
  });

  const [candidateAccount, proAccount] = await Promise.all([
    prisma.account.findFirst({ where: { userId: existing.candidateId, provider: 'google' } }),
    prisma.account.findFirst({ where: { userId: existing.professionalId, provider: 'google' } }),
  ]);

  const event: calendar_v3.Schema$Event = {
    summary: 'Monet Expert Call',
    start: { dateTime: startAtISO, timeZone: timezone },
    end: { dateTime: endAtISO, timeZone: timezone },
    description: 'Zoom meeting',
  };

  const results = await Promise.all([
    candidateAccount?.access_token && candidateAccount.refresh_token
      ? createEvent(candidateAccount.access_token, candidateAccount.refresh_token, event)
      : Promise.resolve(null),
    proAccount?.access_token && proAccount.refresh_token
      ? createEvent(proAccount.access_token, proAccount.refresh_token, event)
      : Promise.resolve(null),
  ]);

  const booking = await prisma.booking.update({
    where: { id },
    data: {
      startAt: new Date(startAtISO),
      endAt: new Date(endAtISO),
      zoomMeetingId: zoom.id?.toString() ?? null,
      zoomJoinUrl: zoom.join_url ?? null,
      calendarEventIds: {
        candidateEventId: results[0]?.id ?? null,
        professionalEventId: results[1]?.id ?? null,
      },
    },
  });

  return NextResponse.json({ booking, zoom });
}
