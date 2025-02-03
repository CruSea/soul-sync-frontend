import { channel } from 'diagnostics_channel';

export const endPoints = {
  auth: 'auth/google-local',
  adminAccount: 'admin/account',
  adminUser: 'admin/user',
  adminMentors: 'admin/mentor',
  mentor: 'mentors',
  channel: 'admin/channel',
};

export const jsonServer = {
  baseUrl: 'http://localhost:3001',
  messages: 'userMessages',
  users: 'users',
  userDetails: 'userDetails',
};
export const channelJsonserver = {
  baseUrl: 'http://localhost:3001',
  channels: 'channels',
};
