import { Messages, Users } from '@/types/mentor';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';
import { jwtDecode } from 'jwt-decode';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeToken(token: string) {
  try {
    return jwtDecode(token); // Returns the decoded payload
  } catch (err) {
    console.error('Invalid token:', err);
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

export function transformChatData(input: Messages | undefined) {
  if (!input) {
    return;
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

  return input.map((message, index, arr) => {
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

export function sortUsers(users: Users) {
  return users.sort(
    (a, b) =>
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
}
