'use server';

import { revalidateTag } from 'next/cache';
import { io } from 'socket.io-client';
import { userToken } from './auth/login';

export async function revalidate(tag: string) {
  const response = revalidateTag(tag);
  return response;
}
const BASE_URL = process.env.SOCKET_URL;

export const socket_address = async () => {
  const token = await userToken();

  return BASE_URL;
};
