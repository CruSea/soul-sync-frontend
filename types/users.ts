export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    joinedDate: string;
    location: string;
    platform: "Telegram" | "Negarit" | "Messenger" | "WhatsApp" | "Twilio";
    avatar: string
  }
  
  export type SortField = 'name' | 'email' | 'joinedDate' | 'location';
  
  