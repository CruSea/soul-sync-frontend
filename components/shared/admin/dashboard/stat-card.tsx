'use client';

import { useEffect, useState } from 'react';
import { getUser, getMentor, getConversation } from '@/actions/admin/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FiUsers, FiActivity } from 'react-icons/fi';
import { Account } from '@/types/users';
import { userProfile } from '@/actions/auth/login';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: 'users' | 'activity';
}

function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <Card className="bg-white dark:bg-black dark:text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon === 'users' ? (
          <FiUsers className="h-4 w-4 text-gray-400" />
        ) : (
          <FiActivity className="h-4 w-4 text-gray-400" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{change}</p>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const [userStats, setUserStats] = useState<any>(null);
  const [mentorStats, setMentorStats] = useState<any>(null);
  const [conversationStat, setConversationStats] = useState<any>(null);
  const [user, setUser] = useState<Account | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userAccountId: Account = await userProfile();
      console.log('id:',userAccountId)
      setUser(userAccountId);
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!user) return;
    if (!user.id) return;

    const accountId = user.id;

    const fetchStats = async () => {
      const statsConversation = await getConversation(accountId);
      const statsMentor = await getMentor(accountId);
      const stats = await getUser(accountId);
      setMentorStats(statsMentor);
      setConversationStats(statsConversation);
      setUserStats(stats);
    };
    fetchStats();
  }, [user]);

  if (!userStats) {
    return <div></div>;
  }

  console.log('mentorStats:', mentorStats);

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      <StatsCard
        title="Total Users"
        value={userStats.meta.total || '10'}
        change={`+${userStats.usersChange || '0'} from last month`}
        icon="users"
      />
      <StatsCard
        title="Total Mentors"
        value={mentorStats.data.meta.total || '0'}
        change={`+${userStats.mentorsChange || '0'} from last month`}
        icon="users"
      />
      <StatsCard
        title="Messages"
        value={userStats.activeUsers || '0'}
        change={`+${userStats.activeUsersChange || '0'} since last hour`}
        icon="activity"
      />
      <StatsCard
        title="Active Mentors"
        value={mentorStats.activeCount || '0'}
        change={`+${userStats.activeMentorsChange || '0'} since last hour`}
        icon="activity"
      />
    </div>
  );
}
