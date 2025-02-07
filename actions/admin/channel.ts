'use server';
import apiCall from '../base-api/api';
import { Channel } from '@/types/channel';
const Url = {
  fetchedChannel: `admin/channel`,
};

export const fetchedChannels = async (id: string) => {
  const response = await apiCall({
    url: `${Url.fetchedChannel}?accountId=${id}`,
    tag: 'fetchedChannel',
  });
  const data = response;

  return data;
};

export const handleAddChannel = async (body: Channel) => {
  const response = await apiCall({
    url: Url.fetchedChannel,
    method: 'POST',
    data: body,
    tag: 'addChannel',
  });
  const data = response;

  return data;
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
  const response = await apiCall({
    url: `${Url.fetchedChannel}/${deleteId}`,
    method: 'DELETE',
    tag: 'Delete-channel',
  });
  const data = response;
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
    setChannels((prevItems) =>
      prevItems.map((item) =>
        item.id === connectedId ? { ...item, is_on: true } : item
      )
    );
    const body = {
      url: `message/telegram?id=${connectedId}`,
    };

    const response = await apiCall({
      url: `${Url.fetchedChannel}/${connectedId}/connect`,
      method: 'POST',
      data: body,
      tag: 'connect-channel',
    });
    const data = response;
    return data;
  }
};
