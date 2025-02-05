'use server';
import { cookies } from 'next/headers';
import apiCall from '../middleware/api';
import { redirect } from 'next/navigation';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Url = {
  login: `${BASE_URL}/auth/google-local`,
};

export const Login = async () => {
  const response = await apiCall({ url: Url.login, tag: 'login' });
  const data = response;
  return data;
};

export async function logoutAction() {
  const cookieStore = cookies();
  (await cookieStore).delete('user-profile');
  (await cookieStore).delete('auth-token');
}
