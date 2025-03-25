import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  const role = req.cookies.get('role')?.value;

  if (!token) {
    return NextResponse.redirect('/login');
  }

  if (req.nextUrl.pathname.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect('http://localhost:3001/unauthorized');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/admin'],
};
