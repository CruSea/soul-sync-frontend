'use server';
import { DeleteRequest, GetRequest, PostRequest } from '@/base-api/method';
import { Channel } from '@/types/channel';
const Url = {
  fetchedChannel: `admin/channel`,
  telegram: `message/telegram?id`,
};

export const fetchedChannels = async (
  id: string,
  itemsPerPage: number,
  page: number
) => {
  console.log('id:', id);

  const getRequest = new GetRequest(
    `${Url.fetchedChannel}?accountId=${id}&page=${page}&limit=${itemsPerPage}`,
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
    'connect-channel'
  );
  const data = postRequest.postData();
  return data;
};
export const handleDisconnect = async (connectedId: string | null) => {
  const postRequest = new PostRequest(
    `${Url.fetchedChannel}/${connectedId}/disconnect`,
    'disconnect-channel'
  );
  const data = postRequest.postData();
  return data;
};
