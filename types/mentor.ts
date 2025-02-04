import { colors } from '@/components/shared/Mentor/Info';

export interface Mentor {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phoneNumber: string;
  specialization: string;
  location: string;
  status: string;
  profileImage: string;
}

export interface MentorLayoutProps {
  children: React.ReactNode;
}

export interface MentorLayoutProps {
  children: React.ReactNode;
  
}

export type User = {
  id: string;
  fullName: string;
  imageUrl: string;
  lastUpdated: string;
};

export type Users = User[];

export type Message = {
  sender: string;
  dateTime: string;
  content: string;
};

export type Messages = Message[];

export type UserDetails = {
  fullName: string;
  age: string;
  gender: string;
  location: string;
  phoneNumber: string;
  email: string;
  platform: string;
  imageUrl: string;
  lastUpdated: string;
  messages: Message[];
};

export interface MentorContainerProps {
  users: Users;
}

export interface UsersListProps {
  currentUser: User;
  users: Users;
  setCurrentUser: (user: User) => void;
}

export type UserMessages = {
  id: string;
  messages: Messages;
  email: string;
  imageUrl: string;
  fullName: string;
};

export interface ChatProps {
  userMessages: UserMessages | undefined;
  userDetails: UserDetails | undefined;
  setUserMessages: React.Dispatch<
    React.SetStateAction<UserMessages | undefined>
  >;
  toggleDrawer: () => void;
}

export interface ProfileProps {
  userDetails: UserDetails | undefined;
}

// type for the group of message threads between user and mentor
export interface threadType {
  isUser: boolean;
  text: string;
  time: string;
  newDay: string;
  id: string;
}

export interface ProfileTypes {
  title: string;
  fullName: string;
  gender: string;
  location: string;
  email: string;
  phone: string;
  platform: string | undefined;
  Expertise: string | undefined;
  src: string;
  abrivation: string;
  age: string;
}

export interface ChatHeaderProps {
  imageUrl: string;
  fullName: string;
  email: string;
  toggleDrawer: () => void;
  userDetails: UserDetails | undefined;
}

export interface InfoProps {
  title: string | undefined;
  value: string | undefined;
  color: keyof typeof colors;
}

export interface MessageProps {
  text: string;
  isUser: boolean;
  time: string;
  newDay: string;
  imageUrl: string;
}
