'use client';

import React, { useState, useMemo } from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Column, FilterOption } from '@/types/data-table';
import { Badge } from '@/components/ui/badge';

interface Mentee {
  id: string | number;
  name: string;
  phoneNumber: string;
  platform: string;
  location: string;
  status: 'Joined' | 'Pending';
  imageUrl: string;
  joinedDate?: string;
}

const columns: Column<Mentee>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (mentee) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={mentee.imageUrl} alt={mentee.name} />
          <AvatarFallback>{mentee.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {mentee.name}
      </div>
    ),
  },
  { key: 'phoneNumber', header: 'Phone Number' },
  { key: 'platform', header: 'Platform' },
  { key: 'location', header: 'Location' },
  {
    key: 'status',
    header: 'Status',
    render: (mentee) => (
      <Badge variant={mentee.status === 'Joined' ? 'default' : 'secondary'}>
        {mentee.status}
      </Badge>
    ),
  },
  {
    key: 'joinedDate',
    header: 'Joined Date',
    render: (mentee) =>
      mentee.joinedDate
        ? new Date(mentee.joinedDate).toLocaleDateString()
        : '-',
  },
];

const filterOptions: FilterOption<Mentee>[] = [
  { key: 'status', label: 'Joined' },
  { key: 'status', label: 'Pending' },
];
const search = ['name', 'location', 'platform'];

const UserTable: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [allMentees, setAllMentees] = useState<Mentee[]>([]);
  const endPoint = 'http://localhost:3500/mentees';

  const onDataFetched = (data: Mentee[]) => {
    const sortedMentees = data
      .filter((mentee) => mentee.joinedDate)
      .sort((a, b) => {
        const dateA = new Date(a.joinedDate!).getTime();
        const dateB = new Date(b.joinedDate!).getTime();
        return dateB - dateA;
      });

    const recentMentees = sortedMentees.slice(0, 4);

    setAllMentees(recentMentees);

    return recentMentees;
  };

  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">New Mentees</h1>
        </div>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <DataTable<Mentee>
            columns={columns}
            searchFields={search as []}
            filterOptions={filterOptions}
            itemsPerPage={4}
            apiUrl={endPoint}
            enableActions={false}
            enablePagination={false}
            onError={(errorMessage) => {
              setError(errorMessage);
              console.error('DataTable error:', errorMessage);
            }}
            onDataFetched={onDataFetched}
          />
        )}
      </div>
    </div>
  );
};

export default UserTable;
