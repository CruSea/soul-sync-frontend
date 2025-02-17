'use server';
import { DeleteRequest, GetRequest, PostRequest } from '@/base-api/method';
import { Channel } from '@/types/channel';
const Url = {
  fetchedChannel: `admin/channel`,
  telegram: `message/telegram?id`,
};

export const fetchedChannels = async (id: string) => {
  const getRequest = new GetRequest(
    `${Url.fetchedChannel}?accountId=${id}`,
    'fetche-channel'
  );
  const data = getRequest.getData();
  return data;
};

export const handleAddChannel = async (body: Channel) => {
  console.table(body);
  // const tempRequest = {
  //   name: body.name,
  //   configuration: body.configuration,
  //   accountId: body.accountId,
  // };
  const postRequest = new PostRequest(
    `${Url.fetchedChannel}`,
    'add-channel',
    body
  );
  const data = postRequest.postData();
  return data;
};

export const handleDeleting = async (deleteId: string) => {
  const deleteRequest = new DeleteRequest(
    `${Url.fetchedChannel}/${deleteId}`,
    'Delete-channel'
  );
  const data = deleteRequest.deleteData();

  return data;
};

export const handleConnect = async (connectedId: string | null) => {
  const postRequest = new PostRequest(
    `${Url.fetchedChannel}/${connectedId}/connect`,
    'connect-channel',
    { url: `${Url.telegram}=${connectedId}` }
  );
  const data = postRequest.postData();
  return data;
};
