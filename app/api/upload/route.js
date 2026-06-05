import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { isAdminAuthenticated } from '../../lib/auth';

export async function POST(request) {
  try {
    // 1. Verify admin session
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // 3. Convert file to binary buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. Resolve destination path under public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // 5. Generate a unique, sanitized file name
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${sanitizedName}`;
    const filePath = path.join(uploadDir, filename);

    // 6. Write file to public/uploads directory
    await fs.writeFile(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
