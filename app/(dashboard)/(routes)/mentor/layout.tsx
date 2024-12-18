'use client'
import MentorLayout from "@/components/shared/layout/mentor-layout";
import { MentorLayoutProps } from "@/types/mentor";
import { usePathname } from "next/navigation";

const MentorFrontPageLayout: React.FC<MentorLayoutProps> = ({ children }) => {

  const pathname = usePathname();

  // Get the last segment of the URL
  const lastSegment = pathname.split('/').filter(Boolean).pop();

  // List of pages to exclude from this layout
  const excludedRoutes = ["/mentor/get-started"];

  if (excludedRoutes.includes(pathname)) {
    return <>{children}</>; // Render without the layout
  }

  return (
    <MentorLayout title="Mentor">
      {children}
    </MentorLayout>

  );
};

export default MentorFrontPageLayout;
