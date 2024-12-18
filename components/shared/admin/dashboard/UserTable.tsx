"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { User, SortField } from "@/types/users";

const USERS_DATA: User[] = Array.from({ length: 2350 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: "Pristia Candra",
  email: "ken99@yahoo.com",
  phoneNumber: "+251972729423",
  joinedDate: "Oct 29,2024",
  location: "Addis Ababa",
}));

export function UsersTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  const filteredAndSortedUsers = useMemo(() => {
    return USERS_DATA.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    ).sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [searchQuery, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);
  const currentUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleSort = (field: SortField) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="container mx-auto py-10 bg-white p-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by"
            className="pl-10 pr-4 py-2 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={sortBy}
          onValueChange={(value) => handleSort(value as SortField)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="joinedDate">Joined Date</SelectItem>
            <SelectItem value="location">Location</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">...</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email {sortBy === "email" && (sortOrder === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("joinedDate")}
              >
                Joined Date{" "}
                {sortBy === "joinedDate" && (sortOrder === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("location")}
              >
                Location{" "}
                {sortBy === "location" && (sortOrder === "asc" ? "▲" : "▼")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>...</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.joinedDate}</TableCell>
                <TableCell>{user.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
          {Math.min(currentPage * usersPerPage, filteredAndSortedUsers.length)}{" "}
          of {filteredAndSortedUsers.length} users
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
