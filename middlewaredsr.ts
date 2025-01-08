import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define the restricted route
  const protectedPath = '/temp';

  // Check if the user is accessing the protected route
  if (req.nextUrl.pathname.startsWith(protectedPath)) {
    // If no valid token, redirect to the sign-in page
    if (!token) {
      const signInUrl = new URL('/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to `/admin/` and its subroutes
};
