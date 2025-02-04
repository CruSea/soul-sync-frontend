import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
 // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const token = req.cookies.get('auth-token')?.value;

  // Define the restricted route
  const protectedPath = '/admin';

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
// middleware.ts
// import { NextResponse, type NextRequest } from 'next/server';
// import { verifyToken } from './lib/utils';

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get('auth-token')?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // Verify token with your auth service
//   const isValid = await verifyToken(token);

//   if (!isValid) {
//     const response = NextResponse.redirect(new URL('/', request.url));
//     response.cookies.delete('auth-token');
//     return response;
//   }

//   return NextResponse.next();
// }