import LoginPageCard from '@/components/login-page/login-page-card';
import LoginPageSidebar from '@/components/login-page/login-page-sidebar';

import { User_Info } from '@/types/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  // Get cookies directly in server component
  const cookieStore = cookies();
  const userProfile = (await cookieStore).get('user-profile')?.value;

  // Parse user data if cookie exists
  const user: User_Info | null = userProfile ? JSON.parse(userProfile) : null;
  console.table(user);
  console.log('the user', user);
  // Redirect logged-in users based on role
  if (user) {
    switch (user.role) {
      case 'Owner':
        redirect('/admin');
        break;
      case 'Mentor':
        redirect('/mentor');
        break;
      default:
        redirect('/admin');
        break;
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
