'use server';
import { getUser } from '@/actions/user/get-user';
import MentorContainer from '@/components/shared/Mentor/mentor-container';
import { sortUsers } from '@/lib/utils';

const MentorView = async () => {
  // Fetch users from the JSON Server
  const response = await getUser();
  if (response.error) {
    throw new Error('Failed to fetch users from JSON Server');
  }

  if (response.length === 0) {
    throw new Error('No users found');
  }

  const sortedUsers = sortUsers(response); // backend will send a sorted list in actual implementation

  return (
    <>
      <MentorContainer users={sortedUsers} />
    </>
  );
};

export default MentorView;
