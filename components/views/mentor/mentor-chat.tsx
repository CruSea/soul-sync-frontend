'use server';
import MentorContainer from '@/components/shared/Mentor/mentor-container';
import { User_Info } from '@/types/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const MentorView = async () => {

  return (
    <>
      <MentorContainer />
    </>
  );
};

export default MentorView;
