import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const derived = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  return `scrypt:${salt.toString('hex')}:${derived.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [prefix, saltHex, hashHex] = stored.split(':');
  if (prefix !== 'scrypt' || !saltHex || !hashHex) return false;
  const derived = (await scrypt(password, Buffer.from(saltHex, 'hex'), KEY_LENGTH)) as Buffer;
  const expected = Buffer.from(hashHex, 'hex');
  return expected.length === derived.length && timingSafeEqual(expected, derived);
}
