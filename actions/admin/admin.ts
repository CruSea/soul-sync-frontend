'use server';
import apiCall from '../base-api/api';
const Url = {
  adminAccount: `admin/account`,
  adminMentors: `admin/mentor`,
};

export const checkAccount = async (params: string) => {
  const response = await apiCall({
    url: `${Url.adminAccount}/${params}`,
    tag: 'checkAccount',
  });
  const data = response;

  return data;
};

export const createOrganazation = async (
  id: string,
  body: { name: string; domain: string }
) => {
  const response = await apiCall({
    url: `${Url.adminAccount}/${id}`,
    data: body,
    method: 'PATCH',
    tag: 'createOrg',
  });
  const data = response;
  return data;
};

export const deleteMentor = async (id: string) => {
  const response = await apiCall({
    url: `${Url.adminMentors}/${id}`,
    method: 'DELETE',
    tag: 'deleteMentor',
  });

  const data = response;
  return data;
};

export const TableData = async (url: string, tag: string) => {
  const response = await apiCall({ url: url, tag: tag });
  const data = response;
  return data;
};
