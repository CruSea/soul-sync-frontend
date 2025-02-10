'use server';

import { revalidateTag } from 'next/cache';

export async function revalidate(tag: string) {
  const response = revalidateTag(tag);
  return response;
}
