import { checkAccount } from '@/actions/admin/admin';
import { GrowthChart } from '@/components/shared/admin/dashboard/GrowthChart';
import { MentorsChart } from '@/components/shared/admin/dashboard/MentorsChart';
import { StatsCards } from '@/components/shared/admin/dashboard/StatCard';
import UsersTable from '@/components/shared/admin/dashboard/UserTable';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function AdminView() {
  // Get user data from cookies
  const cookieStore = await cookies();
  const userProfile = cookieStore.get('user-profile')?.value;
  // Redirect to login if no user cookie
  // Parse user info from cookie
  const user = userProfile && JSON.parse(userProfile);
  // Verify account status
  const response = await checkAccount(user.id);
  // Handle invalid token
  console.table(response);
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
