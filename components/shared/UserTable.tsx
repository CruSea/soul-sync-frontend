"use client";

import React from "react";
import axios from "axios";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Column, FilterOption } from "@/types/data-table";

interface User {
  id: string | number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

const columns: Array<Column<User>> = [
  {
    key: "name",
    header: "Name",
    render: (user) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
            alt={user.name}
          />
          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {user.name}
      </div>
    ),
  },
  { key: "username", header: "Username" },
  { key: "email", header: "Email" },
  { key: "phone", header: "Phone" },
  { key: "website", header: "Website" },
  {
    key: "company",
    header: "Company",
    render: (user) => user.company.name,
  },
];

const filterOptions: Array<FilterOption<User>> = [
  { key: "website", label: "hildegard.org" },
  { key: "website", label: "anastasia.net" },
  { key: "website", label: "ramiro.info" },
];

export function UsersTable() {
  const handleDelete = async (id: string | number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      console.log(`User with id ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Users</h1>
        </div>
        <DataTable
          apiUrl="https://jsonplaceholder.typicode.com/users"
          columns={columns}
          searchFields={["name", "username", "email", "phone", "website"]}
          filterOptions={filterOptions}
          itemsPerPage={3}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
