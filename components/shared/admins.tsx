"use client";

import React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { InviteAdminDialog } from "./invite-admin-dialog";
import type { Admin } from "@/types/admin";
import { Column, FilterOption } from "@/types/data-table";

const ALL_ADMINS: Admin[] = Array.from({ length: 50 }, (_, i) => ({
  id: `admin-${i + 1}`,
  name: `Admin ${i + 1}`,
  age: 25 + Math.floor(Math.random() * 30),
  gender: Math.random() > 0.5 ? "Male" : "Female",
  email: `admin${i + 1}@example.com`,
  phoneNumber: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  location: ["Addis Ababa", "New York", "London", "Tokyo", "Sydney"][
    Math.floor(Math.random() * 5)
  ],
  status: ["Joined", "Pending", "Inactive"][Math.floor(Math.random() * 3)],
  profileImage: `/placeholder.svg?height=40&width=40`,
}));

const columns: Array<Column<Admin>> = [
  {
    key: "name",
    header: "Name",
    render: (admin) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={admin.profileImage} alt={admin.name} />
          <AvatarFallback>{admin.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {admin.name}
      </div>
    ),
  },
  { key: "age", header: "Age" },
  { key: "gender", header: "Gender" },
  { key: "email", header: "Email" },
  { key: "phoneNumber", header: "Phone Number" },
  { key: "location", header: "Location" },
  {
    key: "status",
    header: "Status",
    render: (admin) => <Badge variant="secondary">{admin.status}</Badge>,
  },
  {
    key: "id",
    header: "Action",
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

const filterOptions: Array<FilterOption<Admin>> = [
  { key: "status", label: "Joined" },
  { key: "status", label: "Pending" },
  { key: "status", label: "Inactive" },
];

export function AdminsTable() {
  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6  bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-semibold">Admins</h1>
          <InviteAdminDialog />
        </div>
        <DataTable
          data={ALL_ADMINS}
          columns={columns}
          searchFields={[
            "name",
            "email",
            "status",
            "location",
            "age",
            "gender",
          ]}
          filterOptions={filterOptions}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
}
