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

const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback_secret_agrow_2026_super_secure';

/**
 * Creates a signed session token with expiry
 */
export function createSessionToken() {
  const expiry = Date.now() + (1000 * 60 * 60 * 24); // 24 hours
  const data = `admin:${expiry}`;
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
  return `${data}.${signature}`;
}

/**
 * Check if the current request is from an authenticated administrator.
 * @returns {Promise<boolean>}
 */
export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin_session')?.value;
  
  if (!sessionToken) return false;

  // Verify signature and expiry
  const parts = sessionToken.split('.');
  if (parts.length !== 2) return false;
  
  const [data, signature] = parts;
  const [role, expiryStr] = data.split(':');
  
  if (role !== 'admin') return false;
  
  const expiry = parseInt(expiryStr, 10);
  if (Date.now() > expiry) return false; // Token expired
  
  const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
  
  // Safe comparison
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}
