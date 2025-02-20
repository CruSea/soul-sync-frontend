'use client';
import { deleteMentor } from '@/actions/admin/admin';
import { userProfile } from '@/actions/auth/login';
import DataTable from '@/components/shared/data-table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { endPoints } from '@/data/end-points';
import { toast } from '@/hooks/use-toast';
import type { Column, FilterOption } from '@/types/data-table';
import { Mentor } from '@/types/mentor';
import type { User_Info } from '@/types/users';
import type React from 'react';
import { useEffect, useState } from 'react';
import { InviteMentorDialog } from './invite-mentor-dialog';

const columns: Column<Mentor>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (mentor: Mentor) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{mentor.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {mentor.name}
      </div>
    ),
  },
  { key: 'email', header: 'Email' },
  {
    key: 'age',
    header: 'Age',
    render: (mentor: Mentor) => (mentor.age === null ? 'null' : mentor.age),
  },
  { key: 'gender', header: 'Gender' },
  {
    key: 'expertise',
    header: 'Expertise',
    render: (mentor: Mentor) =>
      mentor.expertise === null ? 'null' : mentor.expertise,
  },
  {
    key: 'availability',
    header: 'Availability',
    render: (mentor: Mentor) =>
      mentor.availability === null
        ? 'null'
        : mentor.availability?.startDate || 'null',
  },
  {
    key: 'location',
    header: 'Location',
    render: (mentor: Mentor) =>
      mentor.location === null ? 'null' : mentor.location,
  },
  {
    key: 'isActive',
    header: 'Status',
    render: (mentor: Mentor) => (
      <Badge variant="secondary">{mentor.isActive ? 'Yes' : 'No'}</Badge>
    ),
  },
];

const filterOptions: FilterOption<Mentor>[] = [
  { key: 'isActive', label: 'Yes' },
  { key: 'isActive', label: 'No' },
];

const searchFields: (keyof Mentor)[] = ['name', 'email', 'gender', 'isActive'];

const MentorsTable: React.FC = () => {
  const [clientUser, setClientUser] = useState<User_Info | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [triggerState, setTriggerState] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userAccount: User_Info = await userProfile();
      setClientUser(userAccount);
    };
    fetchUserProfile();
  }, []);
  const endPoint = `${endPoints.adminMentors}?accountId=${clientUser?.accountId}`;
  // const endpoint = `${endPoints.message}/${clientUser?.id}`;
  const page = currentPage;
  const [itemsPerPage, onItemsPerPageChange] = useState<number>(10);

  const apiUrl = `${endPoint}&page=${page}&limit=${itemsPerPage}`;

  const handleDelete = async (id: string | number) => {
    try {
      const response = await deleteMentor(id as string);
      if (response.error) {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: response.error.description,
        });
        throw new Error('Failed to delete the mentor.');
      }

      setTriggerState(!triggerState);
      toast({
        variant: 'success',
        title: 'Success!',
        description: 'Mentor Successfully deleted.',
      });
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Mentors</h1>
          <InviteMentorDialog
            userName={clientUser?.userName as string}
            accountId={clientUser?.accountId || ''}
            role={clientUser?.role as string}
            triggerState={triggerState as boolean}
            setTriggerState={
              setTriggerState as React.Dispatch<React.SetStateAction<boolean>>
            }
          />
        </div>
        {clientUser && (
          <DataTable<Mentor>
            tag="admin-mentors"
            apiUrl={apiUrl}
            columns={columns}
            searchFields={searchFields}
            filterOptions={filterOptions}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onDelete={handleDelete}
            triggerState={triggerState as boolean}
            setTriggerState={
              setTriggerState as React.Dispatch<React.SetStateAction<boolean>>
            }
          />
        )}
      </div>
    </div>
  );
};

export default MentorsTable;
