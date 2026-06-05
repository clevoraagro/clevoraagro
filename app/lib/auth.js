import crypto from 'crypto';
import { cookies } from 'next/headers';

/**
 * Hash a password using native PBKDF2.
 * @param {string} password 
 * @returns {string} The hashed password with salt
 */
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify a password against a stored hash.
 * @param {string} password 
 * @param {string} storedPasswordHash 
 * @returns {boolean} True if password matches, false otherwise
 */
export function verifyPassword(password, storedPasswordHash) {
  if (!storedPasswordHash || !storedPasswordHash.includes(':')) {
    return false;
  }
  const [salt, hash] = storedPasswordHash.split(':');
  const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === checkHash;
}

/**
 * Check if the current request is from an authenticated administrator.
 * @returns {Promise<boolean>}
 */
export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin_session')?.value;
  return sessionToken === 'evergrow_authenticated_token_2026';
}
