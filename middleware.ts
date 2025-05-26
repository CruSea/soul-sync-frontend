import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logoutAction } from './actions/auth/login';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;
  const userProfileRaw = req.cookies.get('user-profile')?.value;
  const currentPath = req.nextUrl.pathname;
  const now = Math.floor(Date.now() / 1000);

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      if (decoded.exp < now) {
        await logoutAction(); 
        return NextResponse.redirect(new URL('/log-in', req.url));
      }
    } catch (err) {
      console.error('Invalid token format:', err);
      await logoutAction();
      return NextResponse.redirect(new URL('/log-in', req.url));
    }
  }

  
  if (currentPath === '/log-in' && userProfileRaw) {
    try {
      const user = JSON.parse(userProfileRaw);
      const selectedOrgId = req.cookies.get('selected-org-id')?.value;
      const selectedAccount = user.accounts?.find(
        (acc: any) => acc.id === selectedOrgId
      );
      const role = selectedAccount?.role?.name;

      if (role === 'Owner') {
        return NextResponse.redirect(new URL('/admin', req.url));
      } else if (role === 'Mentor') {
        return NextResponse.redirect(new URL('/mentor', req.url));
      } else {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch (err) {
      console.error('Failed to parse user-profile cookie:', err);
    }
  }

  const protectedPaths = ['/admin', '/mentor'];
  const isProtected = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/log-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/mentor/:path*', '/log-in'],
};
