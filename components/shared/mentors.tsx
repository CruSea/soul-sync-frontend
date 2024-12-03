"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Mentor } from "@/types/mentor";
import { InviteMentorDialog } from "./invite-mentor-dialog";

const ALL_MENTORS: Mentor[] = Array.from({ length: 50 }, (_, i) => ({
  id: `mentor-${i + 1}`,
  name: `Mentor ${i + 1}`,
  age: 25 + Math.floor(Math.random() * 30),
  gender: Math.random() > 0.5 ? "Male" : "Female",
  email: `mentor${i + 1}@example.com`,
  phoneNumber: `+1234567890${i.toString().padStart(2, "0")}`,
  specialization: [
    "Marriage Counseling",
    "Career Guidance",
    "Life Coaching",
    "Financial Advice",
  ][Math.floor(Math.random() * 4)],
  location: ["Addis Ababa", "New York", "London", "Tokyo", "Sydney"][
    Math.floor(Math.random() * 5)
  ],
  status: ["Joined", "Pending", "Inactive"][Math.floor(Math.random() * 3)],
  profileImage: `/placeholder.svg?height=40&width=40`,
}));

export function Mentors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<string[]>([]);
  const [mentorsPerPage] = useState(10);

  const filteredMentors = useMemo(() => {
    return ALL_MENTORS.filter((mentor) => {
      const matchesSearch = Object.values(mentor).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchesFilters =
        filters.length === 0 || filters.includes(mentor.specialization);
      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage);

  const currentMentors = useMemo(() => {
    const startIndex = (currentPage - 1) * mentorsPerPage;
    return filteredMentors.slice(startIndex, startIndex + mentorsPerPage);
  }, [currentPage, filteredMentors, mentorsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleFilter = (specialization: string) => {
    setFilters((prev) =>
      prev.includes(specialization)
        ? prev.filter((f) => f !== specialization)
        : [...prev, specialization]
    );
  };

  const removeFilter = (specialization: string) => {
    setFilters((prev) => prev.filter((f) => f !== specialization));
  };

  const allSpecializations = Array.from(
    new Set(ALL_MENTORS.map((mentor) => mentor.specialization))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mentors</h1>
        <InviteMentorDialog />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search mentors"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {allSpecializations.map((specialization) => (
              <DropdownMenuCheckboxItem
                key={specialization}
                checked={filters.includes(specialization)}
                onCheckedChange={() => toggleFilter(specialization)}
              >
                {specialization}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {filters.map((filter) => (
          <Badge key={filter} variant="secondary" className="gap-2">
            {filter}
            <button
              onClick={() => removeFilter(filter)}
              className="focus:outline-none"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMentors.map((mentor) => (
              <TableRow key={mentor.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={mentor.profileImage} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {mentor.name}
                </TableCell>
                <TableCell>{mentor.age}</TableCell>
                <TableCell>{mentor.gender}</TableCell>
                <TableCell>{mentor.email}</TableCell>
                <TableCell>{mentor.phoneNumber}</TableCell>
                <TableCell>{mentor.specialization}</TableCell>
                <TableCell>{mentor.location}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{mentor.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {currentMentors.length} out of {filteredMentors.length}{" "}
          mentors
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="icon"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          {totalPages > 3 && <span className="px-2">...</span>}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
