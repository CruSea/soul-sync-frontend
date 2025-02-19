'use server';

import { revalidateTag } from 'next/cache';

export async function revalidate(tag: string) {
  const response = revalidateTag(tag);
  return response;
}
const BASE_URL = process.env.NEXT_PUBLIC_API_SOCKET_URL;

export async function socket_address() {
  const url = BASE_URL;
  return url;
}
