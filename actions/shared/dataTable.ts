'use server';
import apiCall from '../middleware/api';

export const fetchedDataTable = async (url: string, tag: string) => {
  const response = apiCall({ url: url, tag: tag });
  const data = await response;
  return data;
};

export const fetchedUserTable = async (url: string, tag: string) => {
  const response = apiCall({ url: url, tag: tag });
  const data = await response;
  return data;
};
