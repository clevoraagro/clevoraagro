import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
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
    cookieStore.set('admin_session', 'evergrow_authenticated_token_2026', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 2, // 2 hours
      path: '/',
      sameSite: 'lax',
    });

    return NextResponse.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
