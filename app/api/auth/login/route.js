import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { verifyPassword, createSessionToken } from '../../../lib/auth';
import { cookies } from 'next/headers';
import { applyRateLimit } from '../../../lib/rateLimit';

export async function POST(request) {
  try {
    // Phase 2: Rate Limiting (Max 5 attempts per 15 minutes per IP)
    const rateLimit = applyRateLimit(request, 5, 15 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json({ success: false, error: 'Too many login attempts. Please try again after 15 minutes.' }, { status: 429 });
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Username and password are required' }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json({ success: false, error: 'Invalid username or password' }, { status: 401 });
    }

    const isValid = verifyPassword(password, admin.passwordHash);

    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid username or password' }, { status: 401 });
    }

    const cookieStore = await cookies();
    // Phase 5: Auth Hardening (Cryptographically signed, expiring token with Strict SameSite)
    const token = createSessionToken();
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours to match token expiry
      path: '/',
      sameSite: 'strict',
    });

    return NextResponse.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
