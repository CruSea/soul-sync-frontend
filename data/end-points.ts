import { channel } from 'diagnostics_channel';

export const endPoints = {
  auth: 'auth/google',
  adminAccount: 'admin/account',
  adminUser: 'admin/user',
  adminMentors: 'admin/mentor',
  mentor: 'mentors',
  allConversations: 'conversation',
  channel: 'admin/channel',
};

export const jsonServer = {
  baseUrl: 'http://localhost:3001',
  thread: 'thread',
  conversation: 'conversation',
  userDetails: 'userDetails',
};
export const channelJsonserver = {
  baseUrl: 'http://localhost:3001',
  channels: 'channels',
};
