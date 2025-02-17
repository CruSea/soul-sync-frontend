'use client';
import React, { useEffect, useState } from 'react';
import DataTable from '@/components/shared/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Column, FilterOption } from '@/types/data-table';
import { userProfile } from '@/actions/auth/login';
import messageType from '@/types/message';
import type { Account } from '@/types/users';
import { endPoints } from '@/data/end-points';
const columns: Array<Column<messageType>> = [
  {
    key: 'body',
    header: 'Message',
    render: (messageType) => (
      <div className="flex items-center gap-2">{messageType.body}</div>
    ),
  },
  {
    key: 'address',
    header: 'Address',
    render: (messageType) => (
      <div className="flex items-center gap-2">{messageType.address}</div>
    ),
  },
  {
    key: 'platform',
    header: 'Platform',
    render: (messageType) => (
      <div className="flex items-center gap-2">{messageType.platform}</div>
    ),
  },
  {
    key: 'name', // This is the key for the channel name
    header: 'Channel Name',
    render: (message) => (
      <div className="flex items-center gap-2">{message.name}</div>
    ),
  },
  {
    key: 'createdAt',
    header: 'Received Time',
    render: (message) => (
      <div className="flex items-center gap-2">{message.createdAt}</div>
    ),
  },
  {
    key: 'type',
    header: 'Type',
    render: (message) => (
      <div className="flex items-center gap-2">{message.type}</div>
    ),
  },
];

const filterOptions: Array<FilterOption<messageType>> = [
  { key: 'type', label: 'Sent' },
  { key: 'type', label: 'Recieved' },
];

export function MessageTable() {
  const [clientUser, setClientUser] = useState<Account | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [triggerState, setTriggerState] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userAccount: Account = await userProfile();
      setClientUser(userAccount);
    };
    fetchUserProfile();
  }, []);
  const endpoint = `${endPoints.message}/${clientUser?.id}`;
  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <h1 className="text-2xl font-semibold">Message Logs</h1>
        {clientUser && (
          <DataTable
            //data={MESSAGE_DATA}
            columns={columns}
            searchFields={['name', 'platform', 'type']}
            filterOptions={filterOptions}
            itemsPerPage={10}
            tag="get-message"
            apiUrl={endpoint}
            onDelete={function (id: string | number): Promise<void> {
              throw new Error('Function not implemented.');
            }}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            triggerState={triggerState}
            setTriggerState={setTriggerState}
          />
        )}
      </div>
    </div>
  );
}
