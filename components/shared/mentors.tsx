'use client';

import React from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { InviteMentorDialog } from './invite-mentor-dialog';
import type { Mentor } from '@/types/mentor';
import { Column, FilterOption } from '@/types/data-table';

const ALL_MENTORS: Mentor[] = Array.from({ length: 50 }, (_, i) => ({
  id: `mentor-${i + 1}`,
  name: `Mentor ${i + 1}`,
  age: 25 + Math.floor(Math.random() * 30),
  gender: Math.random() > 0.5 ? 'Male' : 'Female',
  email: `mentor${i + 1}@example.com`,
  phoneNumber: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  specialization: [
    'Marriage Counseling',
    'Career Guidance',
    'Life Coaching',
    'Financial Advice',
  ][Math.floor(Math.random() * 4)],
  location: ['Addis Ababa', 'New York', 'London', 'Tokyo', 'Sydney'][
    Math.floor(Math.random() * 5)
  ],
  status: ['Joined', 'Pending', 'Inactive'][Math.floor(Math.random() * 3)],
  profileImage: `/placeholder.svg?height=40&width=40`,
}));

const columns: Array<Column<Mentor>> = [
  {
    key: 'name',
    header: 'Name',
    render: (mentor) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={mentor.profileImage} alt={mentor.name} />
          <AvatarFallback>{mentor.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {mentor.name}
      </div>
    ),
  },
  { key: 'age', header: 'Age' },
  { key: 'gender', header: 'Gender' },
  { key: 'email', header: 'Email' },
  { key: 'phoneNumber', header: 'Phone Number' },
  { key: 'specialization', header: 'Specialization' },
  { key: 'location', header: 'Location' },
  {
    key: 'status',
    header: 'Status',
    render: (mentor) => <Badge variant="secondary">{mentor.status}</Badge>,
  },
  {
    key: 'id',
    header: 'Action',
    render: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    ),
  },
];

const filterOptions: Array<FilterOption<Mentor>> = [
  { key: 'specialization', label: 'Marriage Counseling' },
  { key: 'specialization', label: 'Career Guidance' },
  { key: 'specialization', label: 'Life Coaching' },
  { key: 'specialization', label: 'Financial Advice' },
];

export function MentorsTable() {
  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6  bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-semibold">Mentors</h1>
          <InviteMentorDialog />
        </div>
        <DataTable
          data={ALL_MENTORS}
          columns={columns}
          searchFields={[
            'name',
            'email',
            'specialization',
            'location',
            'age',
            'gender',
            'status',
          ]}
          filterOptions={filterOptions}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
}
