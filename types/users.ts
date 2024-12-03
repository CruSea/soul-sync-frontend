export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    joinedDate: string;
    location: string;
  }
  
  export type SortField = 'name' | 'email' | 'joinedDate' | 'location';
  
  