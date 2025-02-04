
import LoginPageCard from '@/components/shared/LoginPage/LoginPageCard';
import LoginPageSidebar from '@/components/shared/LoginPage/LoginPageSidebar';
import { Account, role, User_Info } from '@/types/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  // Get cookies directly in server component
  const cookieStore = cookies();
  const userProfile = (await cookieStore).get('user-profile')?.value;

  // Parse user data if cookie exists
  const user: User_Info | null = userProfile 
    ? JSON.parse(userProfile)
    : null;

  // Redirect logged-in users based on role
  if (user) {
    switch (user.roleName) {
      case 'Owner':
        redirect('/admin');
      case 'Mentor':
        redirect('/mentor');
      default:
        redirect('/admin');
    }
  }

  // Show login UI for non-authenticated users
  return (
    <div className="w-screen h-screen flex">
      <LoginPageSidebar />
      <LoginPageCard />
    </div>
  );
};

export default LoginPage;