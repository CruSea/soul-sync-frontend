export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    joinedDate?: string;
    location: string;
    platform: string;
    avatar: string;
    date: string;
  }
  
  export type SortField = 'name' | 'email' | 'joinedDate' | 'location';
  
  