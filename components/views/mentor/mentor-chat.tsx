import MentorContainer from '@/components/shared/Mentor/mentor-container';
import { endPoints, jsonServer } from '@/data/end-points';
import { ChartNoAxesColumnDecreasing } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const MentorView = async () => {
  // Fetch users from the JSON Server
  //const response = await fetch(
  //  `${jsonServer.baseUrl}/${jsonServer.conversation}`
  //); // for when connecting to local db server
  const response = await fetch(`${BASE_URL}/${endPoints.allConversations}`); // for when connecting to backend
  if (!response.ok) {
    throw new Error('Failed to fetch users from JSON Server');
  }

  const conversations = await response.json();

  if (conversations.length === 0) {
    throw new Error('No conversations found');
  }

  console.log(
    'the conversatoins',
    conversations,
    'the url',
    `${BASE_URL}/${endPoints.allConversations}`
  );

  return (
    <>
      <MentorContainer conversations={conversations} />
    </>
  );
};

export default MentorView;
