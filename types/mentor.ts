import { colors } from '@/components/shared/Mentor/Info';
import type { StaticImageData } from 'next/image';
import React from 'react';
import { Socket } from 'socket.io-client';

export type Mentor = {
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
};

export type MentorLayoutProps = {
  children: React.ReactNode;
  title: string;
};

type Platform = 'Telegram' | 'WhatsApp' | 'Negarit' | 'Facebook' | 'Twilio';

export type Conversation = {
  conversation_id: string;
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

export type MentorContainerProps = {
  conversations: Conversations;
};

export type ConversationsListProps = {
  currentConversation: Conversation;
  conversations: Conversations;
  setCurrentConversation: (conversation: Conversation) => void;
};

export type UserMessages = {
  id: string;
  messages: Messages;
};

type Metadata = {
  conversationId: string;
};

export type WSMessage = {
  conversationId: string; // Unique identifier for the message
  type: 'RECIEVED' | 'SENT'; // Type of the message, which can be a union of types if needed
  body: string;
  createdAt: string;
};

export type WSSentMessage = {
  type: 'CHAT';
  metadata: Metadata;
  payload: string;
};

export type webSocketMessages = Array<WSMessage>;

export type ConversationInfo = {
  channelId: string;
  address: string;
  socket: string;
  userId: string;
};

export type ConversationInfos = {
  [conversationId: string]: ConversationInfo;
};

export type ChatProps = {
  currentConversation: Conversation;
  userMessages: any;
  currentConversationMessages: webSocketMessages;
  setWebSocketMessages: React.Dispatch<React.SetStateAction<webSocketMessages>>;
  socket: Socket | null;
};

export type transformedMessage = {
  isMentor: boolean;
  text: string;
  time: string;
  newDay: string;
  id: string;
};

export type ProfileProps = {
  userDetails: UserDetails | undefined;
};

export type ProfileTypes = {
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
};

export type ChatHeaderProps = {
  platform: Platform;
  id: string;
};

export type InfoProps = {
  title: string | undefined;
  value: string | undefined;
  color: keyof typeof colors;
};

export type MessageProps = {
  text: string;
  isMentor: boolean;
  time: string;
  newDay: string;
};

export type PlatformIcon = StaticImageData | string;

export type PlatformIconsType = Record<string, PlatformIcon>;

// type for the group of message threads between user and mentor
export type threadType = {
  isMentor: boolean;
  text: string;
  time: string;
  newDay: string;
  id: string;
};

export type chatData = threadType[];
