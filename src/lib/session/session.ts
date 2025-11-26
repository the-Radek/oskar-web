'use server';
import { cookies } from 'next/headers';
import { getIronSession, IronSession, SessionOptions } from 'iron-session';
import { loadSecret } from '../utilities/load-secret';
import { SessionData } from './session-data';

export const sessionOptions: SessionOptions = {
  password: loadSecret('SESSION_PASSWORD_FILE'),
  cookieName: 'sid',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  return getIronSession(await cookies(), sessionOptions);
}
