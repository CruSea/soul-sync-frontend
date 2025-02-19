export default interface Message {
  id: string;
  channelId: string;
  address: string;
  type: string;
  body: string;
  createdAt: string;
  name: string;
  platform: string;
}
