import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
const storedUser = localStorage.getItem('user');
      
  // Define the restricted route
  const protectedPath = "/admin/";
  // Check if the user is accessing the protected route
  if (req.nextUrl.pathname.startsWith(protectedPath)) {
    // If no valid token, redirect to the sign-in page
    if (!storedUser) {
      const signInUrl = new URL("/login-in", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Apply middleware to `/admin/` and its subroutes
};
