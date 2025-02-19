// app/actions/auth.ts
'use server';

import { User_Info } from '@/types/users';
import { cookies } from 'next/headers';

export async function setAuthCookie(userData: User_Info) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'auth-token',
    value: userData?.token as string,
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
    sameSite: 'lax',
  });

  // Set non-sensitive user data in separate cookie
  cookieStore.set({
    name: 'user-profile',
    value: JSON.stringify({
      id: userData.id,
      name: userData.userName,
      role: userData.role,
      imageUrl: userData.imageUrl,
      userId: userData.userId,
    }),

    // secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
  });
}

export async function removeUserProfile() {
  const cookieStore = await cookies();

  cookieStore.delete('auth-token');
  cookieStore.delete('user-profile');
}
