import MentorContainer from '@/components/shared/Mentor/mentor-container';
import { jsonServer } from '@/data/end-points';

const MentorView = async () => {
  // Fetch users from the JSON Server
  const response = await fetch(`${jsonServer.baseUrl}/${jsonServer.conversation}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users from JSON Server');
  }

  const conversations = await response.json();

  if (conversations.length === 0) {
    throw new Error('No conversations found');
  }

  return (
    <>
      <MentorContainer conversations={conversations} />
    </>
  );
};

export default MentorView;
