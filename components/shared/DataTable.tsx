'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Column, FilterOption } from '@/types/data-table';

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchFields?: (keyof T)[];
  filterOptions?: FilterOption<T>[];
  itemsPerPage?: number;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchFields = [],
  filterOptions = [],
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = searchFields.some((field) =>
        String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchesFilters =
        filters.length === 0 ||
        filters.some(
          (filter) =>
            String(
              item[
                filterOptions.find((option) => option.label === filter)
                  ?.key as keyof T
              ]
            ).toLowerCase() === filter.toLowerCase()
        );
      return matchesSearch && matchesFilters;
    });
  }, [data, searchQuery, filters, searchFields, filterOptions]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const toggleFilter = (filter: string) => {
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
    setCurrentPage(1);
  };

  const removeFilter = (filter: string) => {
    setFilters((prev) => prev.filter((f) => f !== filter));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        {filterOptions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {filterOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.label}
                  checked={filters.includes(option.label)}
                  onCheckedChange={() => toggleFilter(option.label)}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {filters.map((filter) => (
          <Badge key={filter} variant="secondary" className="gap-2">
            {filter}
            <Button
              onClick={() => removeFilter(filter)}
              className="focus:outline-none"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key as string}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={column.key as string}>
                    {column.render
                      ? column.render(item)
                      : String(item[column.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {currentData.length} out of {filteredData.length} items
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
              variant={currentPage === i + 1 ? 'default' : 'outline'}
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
