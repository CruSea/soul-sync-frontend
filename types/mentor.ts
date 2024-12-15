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
  title: string;
}

export interface MentorLayoutProps {
  children: React.ReactNode;
}

export type User = {
  userId: string;
  fullName: string;
  imageUrl: string;
};

export type Users = User[];

export type Message = {
  sender: string;
  dateTime: string;
  content: string
}

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

export interface ChatProps {
  currentUser: User;
}

export interface ProfileProps {
  type: string;
  currentUser: User;
  userDetails: UserDetails | null;
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
