import { checkAccount } from '@/actions/admin/admin';
import { userProfile } from '@/actions/auth/login';
import { GrowthChart } from '@/components/shared/admin/dashboard/growth-chart';
import { MentorsChart } from '@/components/shared/admin/dashboard/mentors-chart';
import { StatsCards } from '@/components/shared/admin/dashboard/stat-card';
import UsersTable from '@/components/shared/admin/dashboard/user-table';
import { User_Info } from '@/types/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function AdminView() {

  // Parse user info from cookie
  const user: User_Info | null = await userProfile();

  // Verify account status
  const response = await checkAccount(user.id as string);
  // Handle invalid token

  // Redirect to org creation if no domain
  if (!response?.domain) {
    redirect('/admin/create-org');
  }

  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 basis-[40%] bg-white dark:bg-black p-10 rounded-lg ">
          <StatsCards />
        </div>
        <div className="flex-1 basis-[60%]">
          <GrowthChart />
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap gap-6 mt-8">
        <div className="flex-1 basis-[70%]">
          <UsersTable />
        </div>
        <div className="flex-1 basis-[30%]">
          <MentorsChart />
        </div>
      </div>
    </div>
  );
}
