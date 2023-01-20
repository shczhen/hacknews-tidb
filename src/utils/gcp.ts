import { google } from 'googleapis';

export const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// https://github.com/vercel/vercel/issues/749#issuecomment-715009494
export async function getAuthToken() {
  if (typeof window !== 'undefined') {
    throw new Error('NO SECRETS ON CLIENT!');
  }

  const { privateKey } = JSON.parse(
    process.env.GOOGLE_PRIVATE_KEY || '{ privateKey: null }'
  );
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    projectId: process.env.GOOGLE_PROJECTID,
    credentials: {
      private_key: privateKey,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });
  const authToken = await auth.getClient();
  return authToken;
}
