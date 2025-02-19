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

  if (excludedRoutes.includes(pathname)) {
    return <>{children}</>; // Render without the layout
  }

    useEffect(() => {
      const checkRole = async () => {
        // Fetch user profile
        const userProfileData = await userProfile();
        const userRole = userProfileData?.role;
  
        if (userRole !== "Owner") {
          router.push('/mentor')
        }
      }
  
      checkRole();
    }, [])

  return (
    <MentorLayout title={lastSegment?.toLocaleUpperCase() as string}>
      {children}
    </MentorLayout>
  );
};

export default MentorFrontPageLayout;
