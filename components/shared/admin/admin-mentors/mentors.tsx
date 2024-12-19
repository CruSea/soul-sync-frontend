"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Column, FilterOption } from "@/types/data-table";
import { toast } from "sonner";
import { InviteMentorDialog } from "./invite-mentor-dialog";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const MENTORS_URL = process.env.NEXT_PUBLIC_API_ADMIN_MENTORS_URL;

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
  let endPointUrl = ""

  const fetchMentors = async () => {
    setIsLoading(true);

    try {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (user && token) {
        const userObj = JSON.parse(user);
        const accountId = String(userObj.accounts[0].id)
        const endPoint = `${BASE_URL}/${MENTORS_URL}`;
        const endPointWithId = `${endPoint}/${accountId}/all`;
        endPointUrl = endPointWithId 

        console.log("all data", endPointWithId, userObj, token);

        const response = await fetch(endPointWithId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.log("the response is", response)
          console.log("the whoel response", response)
          throw new Error(`Bad Request: ${errorText}`);
        }

        const responseData = await response.json();
        console.log("Response from server:", responseData, typeof responseData);


        // const transformedData = (responseData);


        setMentors(
          responseData.map((mentor: any) => {
            console.log("the mentor", mentor)
            return {
              id: mentor.id,
              name: mentor.user.name,
              expertise: mentor.expertise,
              age: mentor.age,
              gender: mentor.gender,
              location: mentor.location,
              availability: mentor.availability.startDate,
              isActive: mentor.isActive,
              profileImage: mentor.user.imageUrl || "",
            }
          })
        );
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  useEffect(() => {
    console.log("mentors:----------------------------", mentors)
  }, [mentors])

  const handleDelete = async (id: string | number) => {
    console.log("Deleting mentor with id:", id);
    if (!id) {
      console.error("Delete failed: Invalid mentor ID");
      return;
    }
    try {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (user && token) {
        const endPoint = `${BASE_URL}/${MENTORS_URL}/${id}`;
        const userObj = JSON.parse(user);

        console.log("all data", endPoint, userObj, token);

        const response = await fetch(endPoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
            accountId: `${userObj.accounts[0].id}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Bad Request: ${errorText}`);
        }

        const responseData = await response.json();
        console.log("Response from server:", responseData);
      }
    } catch (error) {
      console.error("Error deleting mentors:", error);
    } finally {
      setMentors((prev) => prev.filter((mentor) => mentor.id !== id));

      toast.success("Mentor has been deleted.");
      console.log("Mentor deleted successfully");
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
          apiUrl={endPointUrl}
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
