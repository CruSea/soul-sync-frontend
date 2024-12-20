'use client'
import { AdminLayout } from "@/components/shared/layout/admin-layout";
import { usePathname } from "next/navigation";


interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> =  ({ children }) => {

  const pathname = usePathname();

  // Get the last segment of the URL
  const lastSegment = pathname.split('/').filter(Boolean).pop();
  return (
    <AdminLayout title={lastSegment?.toLocaleUpperCase() as string}>
    <div className="flex-1  bg-secondary dark:bg-gray-900">
      <div className="container mx-auto">
      
    {children}
      </div>
    </div>
  </AdminLayout>
  
  );
};

export default DashboardLayout;
