// 'use server';
import React from 'react';

import { endPoints } from '@/data/end-points';
import apiCall from '../middleware/api';
import { Channel } from '@/types/channel';
import { channel } from 'diagnostics_channel';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Url = {
  fetchedChannel: `${BASE_URL}/${endPoints.channel}`,
};
export const fetchedChannels = async (user: string | null) => {
  console.log('user found');

  if (!user) {
    console.log('Cannot fetch data');
    return;
  }

  const userObj = JSON.parse(user);
  const requestBody = { accountId: userObj.accounts[0].id };
  if (!requestBody.accountId) {
    throw new Error('accountId is required');
  }

  const response = await apiCall({
    url: `${Url.fetchedChannel}?accountId=${requestBody.accountId}`,
    method: 'GET',
  });

  console.log('fetched', response);
  return response;
};
export const handleAddChannel = async (body: Channel, user: string) => {
  if (user) {
    console.log('user found');
    const userObj = JSON.parse(user);
    const requestBody = {
      accountId: userObj.accounts[0].id,
    };
    const response = apiCall({
      url: Url.fetchedChannel,
      method: 'POST',
      data: body,
    });
    const data = await response;
    return data;
  }
};

export const handleDeleting = async (
  setChannels: React.Dispatch<React.SetStateAction<Channel[]>>,
  deleteId: string | null,
  setDeleteId: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (deleteId !== null) {
    setChannels((prevItems) =>
      prevItems.filter((item) => item.id !== deleteId)
    );
  }
  const response = apiCall({
    url: `${Url.fetchedChannel}/${deleteId}`,
    method: 'DELETE',
  });
  const data = await response;
  setDeleteId(null);
  return data;
};

export const handleConnect = async (
  channel: Channel,
  setChannels: React.Dispatch<React.SetStateAction<Channel[]>>,
  connectedId: string | null,
  setConnectedId: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (channel.id) {
    setConnectedId(channel.id);
  }
  if (connectedId !== null) {
    console.log(connectedId);
    setChannels((prevItems) =>
      prevItems.map((item) =>
        item.id === connectedId ? { ...item, is_on: true } : item
      )
    );
    const body = {
      url: `${BASE_URL}/message/telegram?id=${connectedId}`,
    };
    console.log(
      'Fetching from URL:',
      `${Url.fetchedChannel}/${connectedId}/connect`
    );
    const response = apiCall({
      url: `${Url.fetchedChannel}/${connectedId}/connect`,
      method: 'POST',
      data: body,
    });
    const data = await response;
    return data;
  }
};
