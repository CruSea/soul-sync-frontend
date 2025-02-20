'use server';
import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PatchRequest,
} from '@/base-api/method';
import { inviteMentorProps } from '@/types/requests';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
const Url = {
  adminAccount: `admin/account`,
  adminMentors: `admin/mentor`,
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
  const data = await putRequest.putData();
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

export async function revalidateWithLogging(tag: string) {
  return revalidateTag(tag);
}
