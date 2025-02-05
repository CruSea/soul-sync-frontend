import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { logoutAction } from './actions/auth/login';

export async function middleware(req: NextRequest) {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const token = req.cookies.get('auth-token')?.value;

  // Define the restricted route
  const protectedPath = '/admin';
  const decoded = token && JSON.parse(atob(token?.split('.')[1])); // Decode JWT payload
  const now = Math.floor(Date.now() / 1000);

  if (token&&decoded.exp < now) {
    await logoutAction();
    return NextResponse.redirect(new URL('/', req.url));
  }
  // Check if the user is accessing the protected route
  if (req.nextUrl.pathname.startsWith(protectedPath)) {
    // If no valid token, redirect to the sign-in page
    if (!token) {
      const signInUrl = new URL('/log-in', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to `/admin/` and its subroutes
};
