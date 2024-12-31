'use client';

import { DataTable } from '@/components/shared/DataTable';
import type { User } from '@/types/users';
import { Column, FilterOption } from '@/types/data-table';
import { USERS_DATA } from '@/data/users';

const columns: Column<User>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'phoneNumber', header: 'Phone Number' },
  { key: 'joinedDate', header: 'Joined Date' },
  { key: 'location', header: 'Location' },
];

const filterOptions: FilterOption<User>[] = [
  { key: 'location', label: 'New York' },
  { key: 'location', label: 'London' },
  { key: 'location', label: 'Tokyo' },
  { key: 'location', label: 'Paris' },
  { key: 'location', label: 'Sydney' },
];

export function UsersTable() {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <h1 className="text-2xl font-semibold">Users</h1>
      <DataTable
        data={USERS_DATA}
        columns={columns}
        searchFields={['name', 'email', 'location']}
        filterOptions={filterOptions}
        itemsPerPage={6}
      />
    </div>
  );
}
