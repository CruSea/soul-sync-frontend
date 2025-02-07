'use server';
import apiCall from '../base-api/api';
const Url = {
  getUser: `admin/user`,
};

export const getUser = async () => {
  const response = await apiCall({
    url: `${Url.getUser}`,
    tag: 'getUser',
  });
  const data = response;

  return data;
};
