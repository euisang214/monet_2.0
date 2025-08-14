
import { google, calendar_v3 } from 'googleapis';

export function getOAuthClient() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  return client;
}

export async function getFreeBusy(accessToken: string, refreshToken: string, timeMin: string, timeMax: string) {
  const client = getOAuthClient();
  client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });
  const calendar = google.calendar({ version: 'v3', auth: client });
  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      items: [{ id: 'primary' }],
    },
  });
  return res.data;
}

export async function createEvent(
  accessToken: string,
  refreshToken: string,
  event: calendar_v3.Schema$Event
) {
  const client = getOAuthClient();
  client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });
  const calendar = google.calendar({ version: 'v3', auth: client });
  const res = await calendar.events.insert({ calendarId: 'primary', requestBody: event, sendUpdates: 'all' });
  return res.data;
}
