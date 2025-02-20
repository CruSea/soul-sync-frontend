'use client';
import { userProfile } from '@/actions/auth/login';
import MentorLayout from '@/components/shared/layout/mentor-layout';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const MentorFrontPageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  // Get the last segment of the URL
  const lastSegment = pathname.split('/').filter(Boolean).pop();

  // List of pages to exclude from this layout
  const excludedRoutes = ['/mentor/get-started'];

  useEffect(() => {
    const checkRole = async () => {
      // Fetch user profile
      const userProfileData = await userProfile();
      const userRole = userProfileData?.role;

      if (userRole !== 'Mentor') {
        router.push('/admin');
      }
    };

    checkRole();
  }, [router]);

  if (excludedRoutes.includes(pathname)) {
    return <>{children}</>; // Render without the layout
  }
  return (
    <MentorLayout title={lastSegment?.toLocaleUpperCase() as string}>
      {children}
    </MentorLayout>
  );
};

export default MentorFrontPageLayout;
