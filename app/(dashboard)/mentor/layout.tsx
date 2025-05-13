'use client';

import { userProfile } from '@/actions/auth/login';
import MentorLayout from '@/components/shared/layout/mentor-layout';
import SocketProvider from '@/context/providers/SocketProvider';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import type { Account } from '@/types/users';

const MentorFrontPageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const lastSegment = pathname.split('/').filter(Boolean).pop();

  const excludedRoutes = ['/mentor/get-started'];

  useEffect(() => {
    const checkRole = async () => {
      try {
        const userProfileData: Account = await userProfile();

        const role = userProfileData?.role;
        if (!role || String(role) !== 'Owner') {
          router.push('/mentor');
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        router.push('/mentor');
      }
    };

    checkRole();
  }, [router]);

  return (
    <SocketProvider>
      {excludedRoutes.includes(pathname) ? (
        <>{children}</>
      ) : (
        <MentorLayout title={lastSegment?.toUpperCase() || ''}>
          {children}
        </MentorLayout>
      )}
    </SocketProvider>
  );
};

export default MentorFrontPageLayout;
