import { colors } from '@/components/shared/Mentor/Info';
import type { StaticImageData } from "next/image";

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

type Platform = "Telegram" | "WhatsApp" | "Negarit" | "Facebook" | "Twilio"

export type Conversation = {
  id: string;
  platform: Platform;
};

export type Conversations = Conversation[];

type ISODateString = string & { __brand: 'ISODate' };

export type Message = {
  type: string;
  createdAt: string;
  body: string;
};

export type Messages = Message[];

export type UserDetails = {
  fullName: string;
  age: string;
  gender: string;
  location: string;
  phoneNumber: string;
  email: string;
  platform: Platform;
  imageUrl: string;
  lastUpdated: string;
  messages: Message[];
};

export interface MentorContainerProps {
  conversations: Conversations;
}

export interface ConversationsListProps {
  currentConversation: Conversation;
  conversations: Conversations;
  setCurrentConversation: (conversation: Conversation) => void;
}

export type UserMessages = {
  id: string;
  messages: Messages;
};

interface Metadata {
  userId: string;
  conversationId: string;
}

export interface Socket {
  userId: string;
  socketId: string;
  entryId: string;
}

export interface WSMessage {
  id: string;        // Unique identifier for the message
  type: "CHAT";     // Type of the message, which can be a union of types if needed
  metadata: Metadata; // Metadata containing user and conversation IDs
  payload: string;   // The actual message content
  socket: Socket;    // Information about the socket connection
}

export interface ChatProps {
  currentConversation: Conversation;
  userMessages: UserMessages | undefined;
  setUserMessages: React.Dispatch<
    React.SetStateAction<UserMessages | undefined>
  >;
  sendJsonMessage: (message: WSMessage) => void;
  conversationMessages: WSMessage[];
}

export interface ProfileProps {
  userDetails: UserDetails | undefined;
}



export interface ProfileTypes {
  title: string;
  fullName: string;
  gender: string;
  location: string;
  email: string;
  phone: string;
  platform: Platform | undefined;
  Expertise: string | undefined;
  src: string;
  abrivation: string;
  age: string;
}

export interface ChatHeaderProps {
  platform: Platform;
  id: string
}

export interface InfoProps {
  title: string | undefined;
  value: string | undefined;
  color: keyof typeof colors;
}

export interface MessageProps {
  text: string;
  isMentor: boolean;
  time: string;
  newDay: string;
}



export type PlatformIcon = StaticImageData | string;

export type PlatformIconsType = Record<string, PlatformIcon>


// type for the group of message threads between user and mentor
export interface threadType {
  isMentor: boolean,
  text: string,
  time: string,
  newDay: string,
  id: string,
}

export type chatData = threadType[];