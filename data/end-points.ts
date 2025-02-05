
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const endPoints = {
  auth: 'auth/google',
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
