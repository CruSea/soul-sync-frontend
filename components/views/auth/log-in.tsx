import LoginPageSidebar from '@/components/login-page/login-page-sidebar';
import LoginPageCard from '@/components/login-page/login-page-card';
import { User_Info } from '@/types/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginPage } from '@/content/page';

const LoginPage = async () => {
  const cookieStore = cookies();
  const userProfile = (await cookieStore).get('user-profile')?.value;
  const user: User_Info | null = userProfile ? JSON.parse(userProfile) : null;

  if (user) {
    switch (user.role) {
      case 'Owner':
        redirect('/admin');
      case 'Mentor':
        redirect('/mentor');
      default:
        redirect('/log-in');
    }
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-6 px-4 font-manrope text-gray-900">
      {/* Top section */}
      <LoginPageSidebar />

      {/* Centered login card */}
      <div className="flex-grow flex items-center justify-center w-full">
        <LoginPageCard />
      </div>

      {/* Bottom section - Description */}
      <div className="text-center max-w-md px-4">
        <h2 className="text-xl font-bold whitespace-pre-line">
          {loginPage.line1}
          <br />
          {loginPage.line2}
        </h2>
        <p className="mt-4 text-base text-gray-700">{loginPage.description}</p>
      </div>
    </div>
  );
};

export default LoginPage;
