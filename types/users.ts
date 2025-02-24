export interface User {
  userId?: string;
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  imageUrl?: string;
  joinedDate?: string;
  location?: string;
  platform?: string;
  avatar?: string;
  date?: string;
  accounts?: Account[];
  sub?: string;
}
export type Account = {
  id: string;
  name: string;
  role?: role;
  imageUrl?: string;
  lastUpdated?: string;
  userId?: string;
  email?: string;
};
export type role = {
  id: string;
  name: string;
};

export type User_Info = {
  userName: string | null;
  accountId: string | null;
  roleId: string | null;
  role: string | null;
  token?: string | null;
  imageUrl?: string | null;
  userId?: string | null;
};

export type SortField = 'name' | 'email' | 'joinedDate' | 'location';
