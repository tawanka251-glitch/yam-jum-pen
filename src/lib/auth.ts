import { cookies } from 'next/headers';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { prisma } from '@/lib/prisma';

const COOKIE_NAME = 'yam_session';
const SESSION_DAYS = 7;

type SessionPayload = { userId: string; exp: number };

function secret() {
  return process.env.AUTH_SECRET || 'development-only-change-this-secret';
}

function sign(payload: string) {
  return createHash('sha256').update(`${payload}.${secret()}`).digest('hex');
}

export function createSessionToken(userId: string) {
  const payload = Buffer.from(JSON.stringify({
    userId,
    exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string): SessionPayload | null {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString()) as SessionPayload;
    if (!parsed.userId || parsed.exp < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function setSession(userId: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, createSessionToken(userId), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, '', { httpOnly: true, path: '/', maxAge: 0 });
}

export async function getCurrentUser() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;
  return prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, name: true, email: true, role: true },
  });
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error('UNAUTHORIZED');
  return user;
}
