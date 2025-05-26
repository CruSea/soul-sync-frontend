'use server';

import { User, User_Info } from '@/types/users';
import { cookies } from 'next/headers';
import { decodeToken } from '@/lib/utils';

export async function setAuthCookie(userData: User_Info) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'auth-token',
    value: userData.token || '',
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
  });

  cookieStore.set({
    name: 'selected-org-id',
    value: userData.accountId || '',
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
  });

  cookieStore.set({
    name: 'user-profile',
    value: JSON.stringify({
      id: userData.accountId,
      name: userData.userName,
      role: userData.role ? { name: userData.role, id: userData.roleId } : null,
      imageUrl: userData.imageUrl,
      userId: userData.userId,
      accounts: userData.accounts?.map((acc) => ({
        id: acc.id,
        name: acc.name,
        role: acc.role ? { name: acc.role.name, id: acc.role.id } : null,
      })),
    }),
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
  });
}

export async function googleAuthCallback(token: string) {
  const decoded = decodeToken(token) as User;
  if (!decoded?.accounts) return { success: false };

  if (decoded.accounts.length === 1) {
    const account = decoded.accounts[0];
    await setAuthCookie({
      userId: decoded.sub ?? '',
      userName: decoded.email ?? '',
      accountId: account.id,
      roleId: account.role?.id ?? '',
      role: account.role?.name ?? '',
      imageUrl: decoded.imageUrl ?? '',
      token: token,
      accounts: decoded.accounts.map((acc) => ({
        id: acc.id,
        name: acc.name,
        role: acc.role
          ? {
              name: acc.role.name,
              id: acc.role.id,
            }
          : null,
      })),
    });
    return { success: true, requiresSelection: false };
  }

  return {
    success: true,
    requiresSelection: true,
    accounts: decoded.accounts.map((acc) => ({
      id: acc.id,
      name: acc.name,
      role: acc.role?.name ?? null,
    })),
  };
}

export async function selectAccount(token: string, accountId: string) {
  const decoded = decodeToken(token) as User;
  if (!decoded?.accounts) return { success: false };

  const account = decoded.accounts.find((acc) => acc.id === accountId);
  if (!account) return { success: false };

  await setAuthCookie({
    userId: decoded.sub ?? '',
    userName: decoded.email ?? '',
    accountId: account.id,
    roleId: account.role?.id ?? '',
    role: account.role?.name ?? '',
    imageUrl: decoded.imageUrl ?? '',
    token: token,
    accounts: decoded.accounts.map((acc) => ({
      id: acc.id,
      name: acc.name,
      role: acc.role
        ? {
            name: acc.role.name,
            id: acc.role.id,
          }
        : null,
    })),
  });

  return { success: true };
}

export async function removeUserProfile() {
  const cookieStore = await cookies();

  cookieStore.delete('auth-token');
  cookieStore.delete('user-profile');
  cookieStore.delete('selected-org-id');
}
