"use client";

import React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import type { Message } from "@/types/message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Column, FilterOption } from "@/types/data-table";

const MESSAGE_DATA: Message[] = Array.from({ length: 350 }, (_, i) => ({
  id: `message-${i + 1}`,
  mentorName: `Mentor ${i + 1}`,
  menteeName: `Mentee ${i + 1}`,
  mentorProfileImage: `/mentor-${i + 1}.svg?height=40&width=40`,
  menteeProfileImage: `/mentee-${i + 1}.svg?height=40&width=40`,
  startDate: "16/09/2024",
  startTime: "02:00PM",
  status: i < 5 ? "On Going" : "Ended",
  endDate: i < 5 ? "N/A" : "16/09/2024",
  endTime: i < 5 ? "N/A" : "10:00PM",
}));

const columns: Array<Column<Message>> = [
  {
    key: "mentorName",
    header: "Mentor Name",
    render: (mentor) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={mentor.mentorProfileImage}
            alt={mentor.mentorName}
          />
          <AvatarFallback>{mentor.mentorName.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {mentor.mentorName}
      </div>
    ),
  },
  {
    key: "menteeName",
    header: "Mentee Name",
    render: (mentee) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={mentee.menteeProfileImage}
            alt={mentee.menteeName}
          />
          <AvatarFallback>{mentee.menteeName.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {mentee.menteeName}
      </div>
    ),
  },
  { key: "startDate", header: "Start Date" },
  { key: "startTime", header: "Start Time" },
  {
    key: "status",
    header: "Status",
    render: (message) => (
      <Badge variant={message.status === "On Going" ? "default" : "secondary"}>
        {message.status}
      </Badge>
    ),
  },
  { key: "endDate", header: "End Date" },
  { key: "endTime", header: "End Time" },
  {
    key: "id",
    header: "Action",
    render: () => (
      <Button variant="ghost" size="sm" className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4" />
        Show Chat
      </Button>
    ),
  },
];

const filterOptions: Array<FilterOption<Message>> = [
  { key: "status", label: "On Going" },
  { key: "status", label: "Ended" },
];

export function MessageTable() {
  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <h1 className="text-2xl font-semibold">Message Logs</h1>
        <DataTable
          data={MESSAGE_DATA}
          columns={columns}
          searchFields={["mentorName", "menteeName", "status"]}
          filterOptions={filterOptions}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
}
