export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  phoneNumber: string;
  phone?: string;
  joinedDate?: string;
  location: string;
  platform?: string;
  avatar?: string;
  date?: string
}

export type SortField = "name" | "email" | "joinedDate" | "location";
