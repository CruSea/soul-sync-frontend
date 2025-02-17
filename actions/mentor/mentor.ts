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
  console.log("params", params)
  const getRequest = new GetRequest(`${Url.checkuser}/${params}`, 'user check');
  const data = getRequest.getData();
  return data;
};
