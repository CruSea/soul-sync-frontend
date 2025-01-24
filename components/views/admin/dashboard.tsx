'use client';

import { checkAccount } from '@/actions/admin/admin';
import { GrowthChart } from '@/components/shared/admin/dashboard/GrowthChart';
import { MentorsChart } from '@/components/shared/admin/dashboard/MentorsChart';
import { StatsCards } from '@/components/shared/admin/dashboard/StatCard';
import UsersTable from '@/components/shared/admin/dashboard/UserTable';
import { useAuth } from '@/context/AuthContext';
import { endPoints } from '@/data/end-points';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AdminView() {
  const router = useRouter();
  const { logout, user } = useAuth();
  console.log('user', user);
  useEffect(() => {
    const checkAccounts = async () => {
      // const user = localStorage.getItem('user');

      const userObj = JSON.parse(user as string);

      const response = await checkAccount(userObj.accounts[0].id);

      if (!response) {
        console.error("AccountInfo doesn't exist");
        throw new Error('Account info not found');
      }

      if (!response?.domain) {
        console.log('Redirecting new user to create org page');
        router.push('/admin/create-org');
      }

      if (response?.error?.description === 'Invalid or expired token') {
        logout();
      }
    };

    checkAccounts();
  }, [router, user]);

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
