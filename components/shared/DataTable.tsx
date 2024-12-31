'use client';

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  apiUrl: string;
  columns: Column<T>[];
  searchFields?: (keyof T)[];
  filterOptions?: FilterOption<T>[];
  itemsPerPage: number;
  onDelete?: (id: string | number) => Promise<void>;
  enableActions?: boolean;
  enablePagination?: boolean;
  onError?: (error: string) => void;
  onDataFetched?: (data: T[]) => T[];
}

export function DataTable<T extends { id: string | number }>({
  apiUrl,
  columns,
  searchFields = [],
  filterOptions = [],
  itemsPerPage,
  onDelete,
  enableActions = true,
  enablePagination = true,
  onError,
  onDataFetched,
}: DataTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id: string | number | null;
  }>({ open: false, id: null });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      console.log("Fetching data from:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${JSON.parse(token)}` : "",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API response:", result);

      let processedData: T[];
      if (Array.isArray(result)) {
        processedData = result;
      } else if (result.data && Array.isArray(result.data)) {
        processedData = result.data;
      } else {
        throw new Error("Unexpected data format received from API");
      }

      if (onDataFetched) {
        processedData = onDataFetched(processedData);
      }

      setData(processedData);
      setTotalItems(processedData.length);
    } catch (error) {
      console.error("Error fetching data:", error);
      onError?.(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setData([]);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    searchFields.some((field) =>
      String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const paginatedData = enablePagination
    ? filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredData;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDelete = (id: string | number) => {
    setDeleteDialog({ open: true, id });
  };

  const confirmDelete = async () => {
    const id = deleteDialog.id;
    if (!id) return;

    try {
      await onDelete?.(id);
      setData((prev) => prev.filter((item) => item.id !== id));
      setDeleteDialog({ open: false, id: null });
    } catch (error) {
      console.error("Error deleting data:", error);
      onError?.(
        error instanceof Error
          ? error.message
          : "An error occurred while deleting"
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
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
                  key={`${String(option.key)}:${option.label}`}
                  checked={filters.includes(
                    `${String(option.key)}:${option.label}`
                  )}
                  onCheckedChange={() => {
                    const filterString = `${String(option.key)}:${
                      option.label
                    }`;
                    setFilters((prev) =>
                      prev.includes(filterString)
                        ? prev.filter((f) => f !== filterString)
                        : [...prev, filterString]
                    );
                    setCurrentPage(1);
                  }}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {filters.map((filter) => (
          <Badge key={filter} variant="secondary" className="gap-2">
            {filter.split(":")[1]}
            <Button
              onClick={() => {
                setFilters((prev) => prev.filter((f) => f !== filter));
                setCurrentPage(1);
              }}
              className="focus:outline-none" >
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
                <TableHead key={String(column.key)}>{column.header}</TableHead>
              ))}
              {enableActions && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (enableActions ? 1 : 0)}
                  className="text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (enableActions ? 1 : 0)}
                  className="text-center"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={String(column.key)}>
                      {column.render
                        ? column.render(item)
                        : String(item[column.key])}
                    </TableCell>
                  ))}
                  {enableActions && (
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {enablePagination && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedData.length} out of {filteredData.length} items
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
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
            </Button>
          </div>
        </div>
      )}

      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog({ open: false, id: null })}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
