import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.has('accessToken') ? req.cookies.get('accessToken')?.value : null;
  const role = req.cookies.has('role') ? req.cookies.get('role')?.value : null;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }

  if (req.nextUrl.pathname.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/unauthorized', req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/admin/:path*'],
};
