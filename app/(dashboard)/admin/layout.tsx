'use client';
import { AdminLayout } from '@/components/shared/layout/admin-layout';
import { Toaster } from '@/components/ui/toaster';
import { LayoutProps } from '@/types/admin';
import { usePathname } from 'next/navigation';
import React from 'react';
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  // Get the last segment of the URL
  const lastSegment = pathname.split('/').filter(Boolean).pop();

  // List of pages to exclude from this layout
  const excludedRoutes = ['/admin/get-started', '/admin/create-org'];

  if (excludedRoutes.includes(pathname)) {
    return <>{children}</>; // Render without the layout
  }

  return (
    <AdminLayout title={lastSegment?.toLocaleUpperCase() as string}>
      <div className=" w-full bg-secondary p-0 dark:bg-gray-900">
        <div className="flex mx-auto">{children}</div>
        <Toaster />
      </div>
    </AdminLayout>
  );
};

export default Layout;
