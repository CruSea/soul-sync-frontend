'use client';

import LoginPageCard from '@/components/shared/LoginPage/LoginPageCard';
import LoginPageSidebar from '@/components/shared/LoginPage/LoginPageSidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LogInView = () => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      const userObj = JSON.parse(user);
      if (userObj.accounts[0].role.name === 'Owner') {
        router.push('/admin'); // make it go to owner create page then info page,
      }
      if (userObj.accounts[0].role.name === 'Mentor') {
        router.push('/mentor'); // make it go to mentor info page
      }
    }
  }, [user, router]);

  return (
    <div className="w-screen h-screen flex">
      <LoginPageSidebar />
      <LoginPageCard />
    </div>
  );
};

export default LogInView;
