'use client';
import MentorLayout from '@/components/shared/layout/mentor-layout';
import { usePathname } from 'next/navigation';
import React from 'react';

const MentorFrontPageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Get the last segment of the URL
  const lastSegment = pathname.split('/').filter(Boolean).pop();

  // List of pages to exclude from this layout
  const excludedRoutes = ['/mentor/get-started'];

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
