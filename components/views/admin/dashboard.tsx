'use client';

import { GrowthChart } from '@/components/shared/admin/dashboard/GrowthChart';
import { MentorsChart } from '@/components/shared/admin/dashboard/MentorsChart';
import { StatsCards } from '@/components/shared/admin/dashboard/StatCard';
import UsersTable from '@/components/shared/admin/dashboard/UserTable';
import { endPoints } from '@/data/end-points';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AdminView() {
  const router = useRouter();

  useEffect(() => {
    const checkAccount = async () => {
      try {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (user && token) {
          const userObj = JSON.parse(user);
          const endPoint = `${BASE_URL}/${endPoints.adminAccount}/${userObj.accounts[0].id}`;
          const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });

          if (!response.ok) {
            console.error('Failed to fetch account info', response);
            throw new Error('Fetch failed');
          }

          const accountInfo = await response.json();

          if (!accountInfo) {
            console.error("AccountInfo doesn't exist");
            throw new Error('Account info not found');
          }

          if (!accountInfo.domain) {
            console.log('Redirecting new user to create org page');
            router.push('/admin/create-org');
          }
        } else {
          console.error('User or token not found');
          router.push('/log-in');
        }
      } catch (error) {
        console.error('Error: ', error);
        router.push('/log-in');
      }
    };

    // const randomEslintError = ''  UNCOMMENT THIS There is a problem
    checkAccount();
  }, [router]);

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
