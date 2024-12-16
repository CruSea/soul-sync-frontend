"use client";

import { DataTable } from "@/components/shared/DataTable";
import type { User } from "@/types/users";
import { Column, FilterOption } from "@/types/data-table";

const USERS_DATA: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phoneNumber: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  joinedDate: new Date(
    Date.now() - Math.floor(Math.random() * 10000000000)
  ).toLocaleDateString(),
  location: ["New York", "London", "Tokyo", "Paris", "Sydney"][
    Math.floor(Math.random() * 5)
  ],
}));

const columns: Column<User>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "phoneNumber", header: "Phone Number" },
  { key: "joinedDate", header: "Joined Date" },
  { key: "location", header: "Location" },
];

const filterOptions: FilterOption<User>[] = [
  { key: "location", label: "New York" },
  { key: "location", label: "London" },
  { key: "location", label: "Tokyo" },
  { key: "location", label: "Paris" },
  { key: "location", label: "Sydney" },
];

export function UsersTable() {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <h1 className="text-2xl font-semibold">Users</h1>
      <DataTable
        data={USERS_DATA}
        columns={columns}
        searchFields={["name", "email", "location"]}
        filterOptions={filterOptions}
        itemsPerPage={6}
      />
    </div>
  );
}
