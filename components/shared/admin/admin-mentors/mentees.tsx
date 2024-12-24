"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Column, FilterOption } from "@/types/data-table";
import { toast } from "sonner";

interface Mentee {
  id: string | number;
  name: string;
  age: number;
  gender: "Male" | "Female";
  email: string;
  platform: "Negarit" | "Telegram Bot" | "WhatsApp" | "Facebook";
  phoneNumber: string;
  location: string;
  status: "Joined" | "Pending";
  imageUrl: string;
}

interface MenteesResponse {
  totalMentees: number;
  currentPage: number;
  itemsPerPage: number;
  mentees: Mentee[];
  pagination: {
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

const columns: Column<Mentee>[] = [
  {
    key: "name",
    header: "Name",
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
  { key: "age", header: "Age" },
  { key: "gender", header: "Gender" },
  { key: "email", header: "Email" },
  { key: "platform", header: "Platform" },
  { key: "phoneNumber", header: "Phone Number" },
  { key: "location", header: "Location" },
  {
    key: "status",
    header: "Status",
    render: (mentee) => (
      <Badge variant="secondary">{mentee.status ? "Joined" : "Pending"}</Badge>
    ),
  },
];

const filterOptions: FilterOption<Mentee>[] = [
  { key: "platform", label: "Negarit" },
  { key: "platform", label: "Telegram Bot" },
  { key: "platform", label: "WhatsApp" },
  { key: "platform", label: "Facebook" },
];

const MenteesTable: React.FC = () => {
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const endPoint = "http://localhost:3500/mentees";

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const response = await fetch(endPoint);
        if (!response.ok) {
          throw new Error("Failed to fetch mentees");
        }
        const data: MenteesResponse = await response.json();
        setMentees(data.mentees);
        console.log("mentees", data.mentees);
      } catch (err) {
        setError("Error fetching mentees. Please try again later.");
        console.error("Error fetching mentees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentees();
  }, []);
  const handleDelete = async (id: string | number) => {
    try {
      const response = await fetch(`${endPoint}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete the mentee.");
      }
      setMentees(mentees.filter((mentee) => mentee.id !== id));
      toast("Mentee has been deleted.");
    } catch (error) {
      console.error("Error deleting mentee:", error);
      toast.error("Failed to delete mentee");
      throw error;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Mentees</h1>
        </div>
        <DataTable<Mentee>
          data={mentees}
          columns={columns}
          searchFields={[
            "name",
            "age",
            "gender",
            "email",
            "platform",
            "location",
            "status",
          ]}
          filterOptions={filterOptions}
          itemsPerPage={5}
          onDelete={handleDelete}
          apiUrl={endPoint}
        />
      </div>
    </div>
  );
};

export default MenteesTable;
