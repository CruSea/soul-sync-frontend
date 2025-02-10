'use server';
import { userProfile } from '@/actions/auth/login';
import { getUser } from '@/actions/user/get-user';
import MentorContainer from '@/components/shared/Mentor/mentor-container';
import { sortUsers } from '@/lib/utils';
import { Account } from '@/types/users';

const MentorView = async () => {
  // Fetch users from the JSON Server

  return (
    <>
      <MentorContainer />
    </>
  );
};

export default MentorView;
