'use server';
import { revalidateTag } from 'next/cache';
export async function revalidateData(tag: string) {
  console.log(`Revalidating: ${tag}`);
  revalidateTag('add-channel');
}
