'use client';

import React, { useState } from 'react';
import DataTable from '@/components/shared/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Column, FilterOption } from '@/types/data-table';
import { toast } from '@/hooks/use-toast';
import { deleteMentor } from '@/actions/admin/admin';
import Image from 'next/image';
import confused from 'public/assets/confused.jpg';

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
const temp = false;

const MenteesTable: React.FC = () => {
  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900 min-h-full">
      <div className="space-y-6 bg-white p-6 rounded-lg h-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">List of Mentees</h1>
        </div>
        {temp ? (
          <div className="text-red-500">Error</div>
        ) : (
          //
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center mb-4 text-3xl font-bold">
              I don’t Think This page is built yet
            </h1>
            <Image src={confused} alt="confused" width={320} height={480} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenteesTable;
