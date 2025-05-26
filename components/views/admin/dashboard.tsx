'use client';

import { GrowthChart } from '@/components/shared/admin/dashboard/growth-chart';
import { MentorsChart } from '@/components/shared/admin/dashboard/mentors-chart';
import { StatsCards } from '@/components/shared/admin/dashboard/stat-card';
import UsersTable from '@/components/shared/admin/dashboard/user-table';
export default function AdminView() {

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
