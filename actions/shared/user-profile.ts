'use server';

import apiCall from '../../base-api/api';

export const fetchUserProfile = async (url: string) => {
  const response = apiCall({
    url: url,
    tag: 'fetchUserProfile',
  });

  const data = await response;
  return data;
};
