import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Protect the admin dashboard routes
  if (pathname.startsWith('/admin/dashboard')) {
    const adminSession = request.cookies.get('admin_session');

    // If there is no session cookie, redirect to login page instantly
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

// Only run middleware on dashboard routes to optimize performance
export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
