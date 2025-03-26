'use server';

import { GetRequest } from '@/base-api/method';

const Url = {
  conversation: `conversation`,
  checkuser: `admin/user`,
};

export const conversation = async () => {
  const getRequest = new GetRequest(`${Url.conversation}`, 'conversation');
  const data = await getRequest.getData();
  return data;
};

export const checkUser = async (params: string) => {
 
  const getRequest = new GetRequest(`${Url.checkuser}/${params}`, 'user check');
  const data = getRequest.getData();
  return data;
};

export const getMessages = async (params: string) => {
  const getRequest = new GetRequest(
    `${Url.conversation}/${params}`,
    'current conversation messages'
  );

  const data = await getRequest.getData();
  return data;
};
