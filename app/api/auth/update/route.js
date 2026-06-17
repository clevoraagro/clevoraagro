import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';
import { cookies } from 'next/headers';
import crypto from 'crypto';

function hashPassword(password) {
  const salt = 'evergrow_salt_2026';
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newUsername, newPassword } = await request.json();

    if (!currentPassword || !newUsername || !newPassword) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    // Since we only have one admin in this system, find the first one
    const admin = await prisma.admin.findFirst();

    if (!admin) {
      return NextResponse.json({ success: false, error: 'Admin account not found' }, { status: 404 });
    }

    // Verify current password
    const isValid = verifyPassword(currentPassword, admin.passwordHash);

    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 401 });
    }

    // Update credentials
    const newPasswordHash = hashPassword(newPassword);

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        username: newUsername,
        passwordHash: newPasswordHash,
      },
    });

    return NextResponse.json({ success: true, message: 'Credentials updated successfully' });
  } catch (error) {
    console.error('Update credentials error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
