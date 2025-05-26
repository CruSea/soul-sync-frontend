'use client';

import LoginPageCard from '@/components/login-page/login-page-card';
import LoginPageSidebar from '@/components/login-page/login-page-sidebar';

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex">
      <LoginPageSidebar />
      <LoginPageCard />
    </div>
  );
};

export default LoginPage;
