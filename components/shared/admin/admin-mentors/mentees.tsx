'use client';

import React, { useEffect, useState } from 'react';
import DataTable, { type Column } from '@/components/shared/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { FilterOption } from '@/types/data-table';
import { toast } from '@/hooks/use-toast';
import { deleteMentor } from '@/actions/admin/admin';
import type { Account } from '@/types/users';
import { useRouter } from 'next/navigation';
import { userProfile } from '@/actions/auth/login';

interface Mentee {
  id: string | number;
  accountId: string;
  name: string;
  email: string;
  age?: number | null;
  gender: string;
  location?: string | null;
  platform: string;
  phoneNumber: string;
  status: string;
  imageUrl?: string;
  joinedDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const columns: Column<Mentee>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (mentee: Mentee) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={mentee.imageUrl} alt={mentee.name} />
          <AvatarFallback>{mentee.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {mentee.name}
      </div>
    ),
  },
  { key: 'email', header: 'Email' },
  { key: 'age', header: 'Age' },
  { key: 'gender', header: 'Gender' },
  { key: 'platform', header: 'Platform' },
  { key: 'phoneNumber', header: 'Phone Number' },
  { key: 'location', header: 'Location' },
  {
    key: 'status',
    header: 'Status',
    render: (mentee: Mentee) => (
      <Badge
        variant={
          mentee.status === 'Joined'
            ? 'default'
            : mentee.status === 'Pending'
              ? 'secondary'
              : 'destructive'
        }
      >
        {mentee.status}
      </Badge>
    ),
  },
  {
    key: 'joinedDate',
    header: 'Joined Date',
    render: (mentee: Mentee) =>
      mentee.joinedDate
        ? new Date(mentee.joinedDate).toLocaleDateString()
        : '-',
  },
];

const filterOptions: FilterOption<Mentee>[] = [
  { key: 'platform', label: 'Negarit' },
  { key: 'platform', label: 'Telegram Bot' },
  { key: 'platform', label: 'WhatsApp' },
  { key: 'platform', label: 'Facebook' },
  { key: 'status', label: 'Joined' },
  { key: 'status', label: 'Pending' },
  { key: 'status', label: 'Left' },
];

const searchFields: (keyof Mentee)[] = [
  'name',
  'email',
  'age',
  'gender',
  'location',
  'status',
  'platform',
];

const MenteesTable: React.FC = () => {
  const [clientUser, setClientUser] = useState<Account | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [triggerState, setTriggerState] = useState<boolean>(false);
  const router = useRouter();

  const endPoint = `http://localhost:3500/data`;

  const handleDelete = async (id: string | number) => {
    try {
      const response = await deleteMentor(id as string);
      if (response.error) {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: response.error.description,
        });
        throw new Error('Failed to delete the mentee.');
      }

      setTriggerState(!triggerState);
      toast({
        variant: 'success',
        title: 'Success!',
        description: 'Mentee successfully deleted.',
      });
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">List of Mentees</h1>
        </div>
        {clientUser && (
          <DataTable<Mentee>
            tag="fetch-mentees"
            apiUrl={endPoint}
            columns={columns}
            searchFields={searchFields}
            filterOptions={filterOptions}
            itemsPerPage={10}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onDelete={handleDelete}
            triggerState={triggerState as boolean}
            setTriggerState={
              setTriggerState as React.Dispatch<React.SetStateAction<boolean>>
            }
          />
        )}
      </div>
    </div>
  );
};

export default MenteesTable;
