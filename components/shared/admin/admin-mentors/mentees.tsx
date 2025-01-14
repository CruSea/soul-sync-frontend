'use client';

import React, { useState } from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Column, FilterOption } from '@/types/data-table';
import { toast } from 'sonner';

interface Mentee {
  id: string | number;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  email: string;
  platform: 'Negarit' | 'Telegram Bot' | 'WhatsApp' | 'Facebook';
  phoneNumber: string;
  location: string;
  status: 'Joined' | 'Pending' | 'Left';
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
  { key: 'age', header: 'Age' },
  { key: 'gender', header: 'Gender' },
  { key: 'email', header: 'Email' },
  { key: 'platform', header: 'Platform' },
  { key: 'phoneNumber', header: 'Phone Number' },
  { key: 'location', header: 'Location' },
  {
    key: 'status',
    header: 'Status',
    render: (mentee) => (
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
    render: (mentee) =>
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

const search = ['name', 'age', 'gender', 'location', 'status', 'platform'];

const MenteesTable: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const endPoint = 'http://localhost:3500/mentees';

  const handleDelete = async (id: string | number) => {
    try {
      const response = await fetch(`${endPoint}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete the mentee.');
      }
      toast.success('Mentee has been deleted.');
    } catch (error) {
      console.error('Error deleting mentee:', error);
      toast.error('Failed to delete mentee');
      throw error;
    }
  };

  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">List Of Mentees</h1>
        </div>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <DataTable<Mentee>
            columns={columns}
            filterOptions={filterOptions}
            searchFields={search as []}
            itemsPerPage={10}
            onDelete={handleDelete}
            apiUrl={endPoint}
            enableActions={true}
            enablePagination={true}
            onError={(errorMessage) => {
              setError(errorMessage);
              console.error('DataTable error:', errorMessage);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MenteesTable;
