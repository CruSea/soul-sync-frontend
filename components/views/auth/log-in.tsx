import LoginPageCard from '@/components/shared/login-page/LoginPageCard';
import LoginPageSidebar from '@/components/shared/login-page/LoginPageSidebar';
import { User_Info } from '@/types/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  // Get cookies directly in server component
  const cookieStore = cookies();
  const userProfile = (await cookieStore).get('user-profile')?.value;

  // Parse user data if cookie exists
  const user: User_Info | null = userProfile ? JSON.parse(userProfile) : null;

  // Redirect logged-in users based on role
  if (user) {
    switch (user.roleName) {
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
