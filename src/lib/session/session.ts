'use server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import redis from './redis';

const SESSION_TTL = 24 * 60 * 60; // 1 day
const COOKIE_ID = 'sid';

export async function createSession(data: unknown): Promise<string> {
  const id = uuidv4();

  const [cookieStore] = await Promise.all([
    cookies(),
    redis.set(`session:${id}`, JSON.stringify(data), 'EX', SESSION_TTL),
  ]);

  cookieStore.set(COOKIE_ID, id, {
    httpOnly: true,
    path: '/',
    maxAge: SESSION_TTL,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return id;
}

export async function getSession(): Promise<unknown> {
  const cookieStore = await cookies();
  const id = cookieStore.get(COOKIE_ID)?.value;
  if (!id) return null;

  const data = await redis.get(`session:${id}`);
  return data ? JSON.parse(data) : null;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const id = cookieStore.get(COOKIE_ID)?.value;
  if (id) await redis.del(`session:${id}`);
  cookieStore.delete(COOKIE_ID);
}
