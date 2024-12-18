"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InviteMentorDialog } from "./invite-mentor-dialog";
import type { Mentor } from "@/types/mentor";
import { Column, FilterOption } from "@/types/data-table";

interface Mentors {
  id: string | number;
  name: string;
  expertise: string;
  age: number;
  gender: string;
  location: string;
  availability: any;
  isActive: boolean;
  profileImage: string;
  user: any;
}

const columns: Array<Column<Mentors>> = [
  {
    key: "name",
    header: "Name",
    render: (mentor) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={mentor?.user.imageUrl} alt={mentor.user.name} />
          <AvatarFallback>{mentor?.user.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {mentor.user.name}
      </div>
    ),
  },
  { key: "age", header: "Age" },
  { key: "gender", header: "Gender" },
  { key: "expertise", header: "Expertise" },
  {
    key: "availability",
    header: "Availability",
    render: (mentor) => mentor.availability.startDate,
  },
  { key: "location", header: "Location" },
  {
    key: "isActive",
    header: "Is Active",
    render: (mentor) => (
      <Badge variant="secondary">{mentor.isActive ? "Yes" : "No"}</Badge>
    ),
  },
];

const filterOptions: Array<FilterOption<Mentors>> = [
  { key: "location", label: "Addis Ababa" },
];

export function MentorsTable() {
  const [mentors, setMentors] = useState<Mentors[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMentors = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXTAUTH_URL}/admin/mentors/`,
        {
          headers: {
            Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZjE0MjE5ZC0zNGNhLTRiZDQtYWQyNy1hNjE4Y2E0YWEyZDAiLCJlbWFpbCI6ImplcmloYWdiakBnbWFpbC5jb20iLCJpbWFnZVVybCI6bnVsbCwiYWNjb3VudHMiOlt7ImlkIjoiODc4ODhmODAtZGI0Yi00OWUyLTgxMDQtMTMyYjMzOTU4NmQxIiwibmFtZSI6IkplcnVzYWxlbSJ9XSwicm9sZXMiOlsiT1dORVIiXSwiaWF0IjoxNzM0MjAyODU4fQ.7LYXWzv0phj_Xdg3YT-dkKGAovbhNlA16zsP3qUghvU`}`, // Include the Bearer token here
          },
        }
      );

      const transformedData = Array?.isArray(response.data)
        ? response.data
        : response.data.items || [];

      setMentors(
        transformedData.map((mentor: any) => ({
          id: mentor.id,
          name: mentor.user.name,
          expertise: mentor.expertise,
          age: mentor.age,
          gender: mentor.gender,
          location: mentor.location,
          availability: mentor.availability.startDate,
          isActive: mentor.isActive,
          profileImage: mentor.user.imageUrl || "",
        }))
      );
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleDelete = async (id: string | number) => {
    console.log("Deleting mentor with id:", id);
    if (!id) {
      console.error("Delete failed: Invalid mentor ID");
      return;
    }

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/mentors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZjE0MjE5ZC0zNGNhLTRiZDQtYWQyNy1hNjE4Y2E0YWEyZDAiLCJlbWFpbCI6ImplcmloYWdiakBnbWFpbC5jb20iLCJpbWFnZVVybCI6bnVsbCwiYWNjb3VudHMiOlt7ImlkIjoiODc4ODhmODAtZGI0Yi00OWUyLTgxMDQtMTMyYjMzOTU4NmQxIiwibmFtZSI6IkplcnVzYWxlbSJ9XSwicm9sZXMiOlsiT1dORVIiXSwiaWF0IjoxNzM0MjAyODU4fQ.7LYXWzv0phj_Xdg3YT-dkKGAovbhNlA16zsP3qUghvU`}`, // Include the Bearer token here
          },
        }
      );
      setMentors((prev) => prev.filter((mentor) => mentor.id !== id));
      console.log("Mentor deleted successfully");
    } catch (error) {
      console.error("Error deleting mentor:", error);
    }
  };
  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Mentors</h1>
          <InviteMentorDialog />
        </div>
        <DataTable
          apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/admin/mentors/`}
          columns={columns}
          searchFields={["name", "age", "gender", "location", "isActive"]}
          filterOptions={filterOptions}
          itemsPerPage={10}
          onDelete={handleDelete}
          data={mentors}
        />
      </div>
    </div>
  );
}
