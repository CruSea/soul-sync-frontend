'use client'
import MentorLayout from "@/components/shared/layout/mentor-layout";
import { MentorLayoutProps } from "@/types/mentor";

const MentorFrontPageLayout: React.FC<MentorLayoutProps> = ({ children }) => {

  return (
    <MentorLayout title="Mentor">
      {children}
    </MentorLayout>

  );
};

export default MentorFrontPageLayout;
