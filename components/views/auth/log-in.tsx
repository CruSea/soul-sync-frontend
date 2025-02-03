'use client';

import LoginPageCard from '@/components/shared/LoginPage/LoginPageCard';
import LoginPageSidebar from '@/components/shared/LoginPage/LoginPageSidebar';
import { useAuth } from '@/context/AuthContext';
import { Account, role } from '@/types/users';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
const LogInView = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      
      if (user.roleName === 'Owner') {
        redirect('/admin'); // make it go to owner create page then info page,
      }
      if (user.roleName === 'Mentor') {
        redirect('/mentor'); // make it go to mentor info page
      }
    }
  }, [user, redirect]);

  return (
    <div className="w-screen h-screen flex">
      <LoginPageSidebar />
      <LoginPageCard />
    </div>
  );
};

export default LogInView;
