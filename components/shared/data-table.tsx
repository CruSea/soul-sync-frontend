'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { Skeleton } from '@/components/ui/skeleton';
import type { FilterOption } from '@/types/data-table';
import { fetchedDataTable } from '@/actions/shared/data-table';
import Pagination from './pagination';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Trash2 } from 'lucide-react'; // Make sure Trash2 is imported

// ... other imports

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T) => React.ReactNode;
}

interface DataTableProps<T> {
  tag: string;
  apiUrl: string;
  columns: Column<T>[];
  searchFields?: (keyof T)[];
  filterOptions?: FilterOption<T>[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onDelete?: (id: string | number) => Promise<void>;
  enableActions?: boolean;
  enablePagination?: boolean;
  onError?: (error: string) => void;
  triggerState: boolean;
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
  itemsPerPage?: number;
  onItemsPerPageChange?: React.Dispatch<React.SetStateAction<number>>;
}

const DataTable = <T extends { id: string | number }>({
  tag,
  apiUrl,
  columns,
  searchFields = [],
  filterOptions = [],
  itemsPerPage,
  currentPage,
  onPageChange,
  onDelete,
  enableActions = true,
  enablePagination = true,
  onError,
  triggerState,
  onItemsPerPageChange,
  setTriggerState,
}: DataTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id: string | number | null;
  }>({ open: false, id: null });
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Tailwind 'md' breakpoint is 768px
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchedDataTable(
          apiUrl,
          tag,
          currentPage,
          itemsPerPage ?? 10
        );

        if (response && response.data) {
          setData(response.data);
          setTotalPages(response.meta.totalPages); // Use meta.totalPages for pagination
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        onError?.(
          error instanceof Error
            ? error.message
            : 'An error occurred while fetching data'
        );
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl, currentPage, itemsPerPage, tag, onError, triggerState]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Apply search and filters to the data
  const filteredData = data.filter((item) => {
    // Apply search
    const matchesSearch = searchFields.some((field) =>
      item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply filters
    const matchesFilters = filters.every((filter) => {
      const [key, value] = filter.split(':');
      return item[key as keyof T]?.toString() === value;
    });

    return matchesSearch && matchesFilters;
  });

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
      setTriggerState(!triggerState);
    } catch (error) {
      onError?.(
        error instanceof Error
          ? error.message
          : 'An error occurred while deleting'
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
        <div className="w-full sm:w-auto flex items-center gap-2 mb-2 sm:mb-0">
          <div className="relative flex-1 min-w-[150px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 w-full text-sm"
            />
          </div>
          {filterOptions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 text-sm px-2 py-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
                    }}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-2 text-xs">
              {filter.split(':')[1]}
              <Button
                onClick={() => {
                  setFilters((prev) => prev.filter((f) => f !== filter));
                }}
                className="focus:outline-none h-6 w-6 p-1"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
      <div className="rounded-lg border">
      
{isSmallScreen ? (
  // Improved Small Screen (Stacked Card) Layout
  <div className="space-y-4">
    {filteredData.map((item) => (
      <div
        key={item.id}
        className="p-4 rounded-xl bg-white shadow-md border border-gray-200 flex flex-col gap-2"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col gap-1 flex-1">
            {columns.map((col) =>
              col.key === 'name' ? (
                <div key={col.key as string} className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{col.header}</span>
                  <span className="text-base font-bold text-gray-900">
                    {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                  </span>
                </div>
              ) : null
            )}
          </div>
          {/* REMOVE TOP DELETE ICON ON SMALL SCREENS */}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {columns.map((col) =>
            col.key !== 'name' ? (
              <div key={col.key as string} className="flex flex-col">
                <span className="text-xs font-medium text-gray-500">{col.header}</span>
                <span className="text-sm text-gray-800 break-words"> {/* Added break-words */}
                  {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                </span>
              </div>
            ) : null
          )}
        </div>
        {enableActions && (
          <div className="flex justify-end gap-2 mt-2"> {/* Removed sm:hidden to always show on small screens */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(item.id)}
              className="text-red-500 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </div>
    ))}
    {filteredData.length === 0 && !loading && (
      <div className="py-4 text-center text-gray-500">No data available</div>
    )}
    {loading &&
      Array.from({ length: itemsPerPage ?? 0 }).map((_, index) => (
        <div
          key={index}
          className="p-4 rounded-xl bg-white shadow-md border border-gray-200 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col gap-1 flex-1">
              {columns.map((col) =>
                col.key === 'name' ? (
                  <div key={col.key as string} className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{col.header}</span>
                    <Skeleton className="h-6 w-24 inline-block" />
                  </div>
                ) : null
              )}
            </div>
            {/* REMOVE TOP DELETE ICON ON SMALL SCREENS (LOADING STATE) */}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {columns.map((col) =>
              col.key !== 'name' ? (
                <div key={col.key as string} className="flex flex-col ml-2">
                  <span className="text-xs font-medium text-gray-500">{col.header}</span>
                  <Skeleton className="h-6 w-24 inline-block" />
                </div>
              ) : null
            )}
          </div>
          {enableActions && (
            <div className="flex justify-end gap-2 mt-2"> {/* Removed sm:hidden (loading state) */}
              <Skeleton className="h-8 w-20" />
            </div>
          )}
        </div>
      ))}
  </div>
) : (
          // Large Screen (Table) Layout - Minor adjustment for potential overflow
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col) => (
                    <TableHead key={col.key as string}>{col.header}</TableHead>
                  ))}
                  {enableActions && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: itemsPerPage ?? 0 }).map((_, index) => (
                    <TableRow key={index}>
                      {columns.map((col) => (
                        <TableCell key={col.key as string}>
                          <Skeleton className="h-6 w-24" />
                        </TableCell>
                      ))}
                      {enableActions && (
                        <TableCell className="text-right">
                          <Skeleton className="h-6 w-6" />
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (enableActions ? 1 : 0)}
                      className="text-center"
                    >
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      {columns.map((col) => (
                        <TableCell key={col.key as string}>
                          {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                        </TableCell>
                      ))}
                      {enableActions && (
                        <TableCell className="text-right">
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
        )}
      </div>
      {enablePagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
        />
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
};

export default DataTable;