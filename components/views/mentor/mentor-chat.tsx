'use server';
import MentorContainer from '@/components/shared/Mentor/mentor-container';
import { User_Info } from '@/types/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const MentorView = async () => {
  // Get user data from cookies
  const cookieStore = await cookies();
  const userProfile = cookieStore.get('user-profile')?.value;
  // Redirect to login if no user cookie
  if (!userProfile) {
    redirect('/log-in')
  }
  // Parse user info from cookie
  const user: User_Info | null = userProfile ? JSON.parse(userProfile) : null;

  if (user?.role !== "Mentor") {
    redirect('/log-in')
  }

  return (
    <>
      <MentorContainer />
    </>
  );
};

export default MentorView;
