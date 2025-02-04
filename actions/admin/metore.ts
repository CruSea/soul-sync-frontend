'use serevr';
import { endPoints } from '@/data/end-points';
import apiCall from '../middleware/api';
import { revalidatePath, revalidateTag } from 'next/cache';
interface inviteMentorProps {
  accountId: string;
  name: string;
  email: string;
}
export const inviteMentore = async (body: inviteMentorProps) => {
  const response = apiCall({
    url: endPoints.adminMentors,
    method: 'POST',
    data: body,
    tag: 'invite-mentor',
  });
  const data = await response;

  return data;
};

export const mentorDelete = async (url: string) => {
  const response = apiCall({
    url: url,
    method: 'DELETE',
    tag: 'delete-mentor',
  });
  const data = await response;
  return data;
};

export function revalidateWithLogging(tag: string) {
  console.log('Revalidating tag:', tag);
  return revalidateTag(tag);
}
