'use server';
import { GetRequest } from '@/base-api/method'; 
const Url = {
  user: 'admin/user/all',
  mentor: 'admin/mentor',
}; 

export const getUser = async (
  accountId: string,
  options?: {
    roleId?: string;
    page?: number;
    limit?: number;
    isActive?: boolean;
  }
): Promise<any> => {
  let url = `${Url.user}?accountId=${accountId}`;
  const { roleId, page, limit, isActive } = options || {};
  if (roleId !== undefined) {
    url += `&roleId=${roleId}`;
  }
  if (page !== undefined) {
    url += `&page=${page}`;
  }
  if (limit !== undefined) {
    url += `&limit=${limit}`;
  }
  if (isActive !== undefined) {
    url += `&isActive=${isActive}`;
  }

  const getRequest = new GetRequest(url, 'get-users-stats');
  const data = await getRequest.getData();
  return data;
};

export const getConversation = async (
  accountId: string,
  page?: number,
  limit?: number
): Promise<any> => {
  let url = `conversation?accountId=${accountId}`;
  if (page !== undefined) {
    url += `&page=${page}`;
  }
  if (limit !== undefined) {
    url += `&limit=${limit}`;
  }
  const getRequest = new GetRequest(url, 'conversation');
  const data = await getRequest.getData();
  return data;
};

export const getMentor = async (accountId: string): Promise<any> => {
  const url = `${Url.mentor}?accountId=${accountId}`;
  const getRequest = new GetRequest(url, 'mentors');
  const data = await getRequest.getData();
  const activeCount = data.data.reduce((count: any, mentor: any) => {
    return mentor.isActive ? count + 1 : count;
  }, 0);
  
  return {
    activeCount,
    data
  };
};
