'use client';

import { Suspense } from 'react';
import LoginPageCard from '@/components/login-page/login-page-card';
import LoginPageSidebar from '@/components/login-page/login-page-sidebar';

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex">
      <LoginPageSidebar />
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPageCard />
      </Suspense>
    </div>
  );
};

export default LoginPage;
