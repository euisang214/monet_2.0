
import fetch from 'node-fetch';

async function getZoomAccessToken() {
  const tokenRes = await fetch('https://zoom.us/oauth/token?grant_type=account_credentials&account_id=' + process.env.ZOOM_ACCOUNT_ID, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(process.env.ZOOM_CLIENT_ID + ':' + process.env.ZOOM_CLIENT_SECRET).toString('base64'),
    },
  });
  const json = await tokenRes.json();
  return json.access_token as string;
}

export async function createZoomMeeting(params: {
  topic: string;
  start_time: string; // ISO
  duration: number; // minutes
  timezone: string;
}) {
  const accessToken = await getZoomAccessToken();
  const res = await fetch('https://api.zoom.us/v2/users/me/meetings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic: params.topic,
      type: 2,
      start_time: params.start_time,
      duration: params.duration,
      timezone: params.timezone,
      settings: { waiting_room: true },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error('Zoom error: ' + err);
  }
  return res.json();
}
