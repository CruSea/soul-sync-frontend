import { AdminLayout } from "@/components/shared/layout/admin-layout";
import { Mentors } from "@/components/shared/admin/admin-mentors/mentors";

export default function AdminViewMentors() {
  return (
    <AdminLayout title="Mentors">
      <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
        <div className="container mx-auto p-6 bg-white">
          <Mentors />
        </div>
      </div>
    </AdminLayout>
  );
}
