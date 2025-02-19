import { Messages, transformedMessage, WSMessage } from '@/types/mentor';
import { timeType } from '@/types/get-started';
import { Messages, Users } from '@/types/mentor';
import { clsx, type ClassValue } from 'clsx';
import { jwtDecode } from 'jwt-decode';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeToken(token: string) {
  try {
    return jwtDecode(token); // Returns the decoded payload
  } catch (err) {
    return null;
  }
}
export function getFallBack(fullName: string) {
  // takes in a name and returns its initals
  return fullName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function transformChatData(
  input: Messages | undefined
): transformedMessage[] | [] {
  if (!input) {
    return [];
  }

  return input.map((message, index, arr) => {
    // checks if the messages next to each other are different, if so adds a newDay text
    const currentDay = formatDate(message.createdAt);
    const previousDay = index > 0 ? formatDate(arr[index - 1].createdAt) : null;

    return {
      isMentor: message.type === 'SENT',
      text: message.body,
      time: formatTime(message.createdAt),
      newDay: currentDay !== previousDay ? currentDay : '',
      id: uuidv4(),
    };
  });
}

export function transformWSData(
  Messages: WSMessage[]
): transformedMessage[] | [] {
  if (!Messages) {
    return [];
  }

  return Messages.map((Message, index, arr) => {
    const currentDay = formatDate(Message.createdAt);
    const previousDay = index > 0 ? formatDate(arr[index - 1].createdAt) : null;
    return {
      isMentor: Message.type === 'SENT',
      text: Message.body,
      time: formatTime(Message.createdAt),
      newDay: currentDay !== previousDay ? currentDay : '',
      id: uuidv4(),
    };
  });
}

export const parseTime = (time: timeType) => {
  const hour = parseInt(time.hour, 10);
  const minute = parseInt(time.minute, 10);
  return (time.dayPeriod === 'PM' ? (hour % 12) + 12 : hour % 12) * 60 + minute;
};
// lib/auth.ts
export async function verifyToken(token: string) {
  try {
    // Example JWT verification
    const decoded = decodeToken(token);
    return !!decoded;
  } catch (error) {
    return false;
  }
}
