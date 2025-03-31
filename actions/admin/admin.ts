'use server';
import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PatchRequest,
} from '@/base-api/method';
import type { inviteMentorProps } from '@/types/requests';
import type { inviteAdminProps } from '@/types/requests';
import type { getStartedMentorFormValues } from '@/types/get-started';

import { revalidateTag } from 'next/cache';
const Url = {
  adminAccount: `admin/account`,
  adminMentors: `admin/mentor`,
  mentorProfile: `mentor/profile`,
  inviteAdmin: `admin/user`,
};

export const checkAccount = async (params: string) => {
  const getRequest = new GetRequest(
    `${Url.adminAccount}/${params}`,
    'checkAccount'
  );
  const data = await getRequest.getData();
  return data;
};

export const createOrganazation = async (
  id: string,
  body: { name: string; domain: string }
) => {
  const putRequest = new PatchRequest(
    `${Url.adminAccount}/${id}`,
    'createOrg',
    body
  );
  const data = await putRequest.patchData();
  return data;
};

export const deleteMentor = async (id: string) => {
  const deleteRequest = new DeleteRequest(
    `${Url.adminMentors}/${id}`,
    'delete-mentor'
  );
  const data = await deleteRequest.deleteData();
  return data;
};

export const TableData = async (url: string, tag: string) => {
  const getRequest = new GetRequest(url, tag);
  const data = await getRequest.getData();
  return data;
};

export const inviteMentore = async (body: inviteMentorProps) => {
  const postRequest = new PostRequest(
    `${Url.adminMentors}`,
    'invite-mentor',
    body
  );
  const data = postRequest.postData();
  return data;
};

export const inviteAdmin = async (body: inviteAdminProps) => {
  const postRequest = new PostRequest(
    `${Url.inviteAdmin}`,
    'invite-admin',
    body
  );
  const data = postRequest.postData();
  return data;
};

export const submitMentorForm = async (
  formData: getStartedMentorFormValues,
  accountId: string
) => {
  // Transform data to match backend format
  const backendData = {
    expertise: formData.expertise.reduce(
      (acc, exp) => {
        const expertiseMap: Record<string, string> = {
          marriageCounseling: 'Expert in marriage counseling',
          discipleship: 'Expert in discipleship counseling',
          spritual: 'Expert in spiritual counseling',
          dayToDay: 'Expert in day-to-day counseling',
          lifeCoach: 'Expert in life coaching',
          psychology: 'Expert in psychological counseling',
        };
        const key =
          exp
            .replace(/Counseling$/, 'Counselor')
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .toLowerCase() + 'Counselor';
        acc[key] = expertiseMap[exp] || `Expert in ${exp}`;
        return acc;
      },
      {} as Record<string, string>
    ),
    capacity: formData.capacity,
    availability: Object.entries(formData.availability)
      .filter(([_, value]) => value !== undefined)
      .reduce(
        (acc, [day, value]) => {
          if (!value) return acc;

          const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);
          const startTime = value.startTime;
          const endTime = value.endTime;
          const timeRange = `${startTime.hour}:${startTime.minute} ${startTime.dayPeriod} - ${endTime.hour}:${endTime.minute} ${endTime.dayPeriod}`;

          acc[formattedDay] = [timeRange];
          return acc;
        },
        {} as Record<string, string[]>
      ),
    age: formData.age,
    gender: formData.gender.toUpperCase(),
    location: formData.location,
  };

  const url = `${Url.mentorProfile}?accountId=${accountId}`;

  const patchRequest = new PatchRequest(url, 'submit-mentor-form', backendData);
  return await patchRequest.patchData();
};

export const toggleMentorStatus = async (
  mentorId: string | number,
  accountId: string,
  isActive: boolean
) => {
  const url = `${Url.adminMentors}/${mentorId}/toggle-status?accountId=${accountId}`;
  const patchRequest = new PatchRequest(url, 'toggle-mentor-status', {
    isActive,
  });
  const data = await patchRequest.patchData();
  revalidateTag('admin-mentors');
  return data;
};

export async function revalidateWithLogging(tag: string) {
  return revalidateTag(tag);
}
