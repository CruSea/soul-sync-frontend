'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import DataTable, { type Column } from '@/components/shared/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { FilterOption } from '@/types/data-table';
import { toast } from '@/hooks/use-toast';
import { InviteMentorDialog } from './invite-mentor-dialog';
import { endPoints } from '@/data/end-points';
import { deleteMentor } from '@/actions/admin/admin';
import type { Account } from '@/types/users';
import { useRouter } from 'next/navigation';
import { userProfile } from '@/actions/auth/login';
import { Mentor } from '@/types/mentor';

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
  const [clientUser, setClientUser] = useState<Account | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [triggerState, setTriggerState] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userAccount: Account = await userProfile();
      setClientUser(userAccount);
    };
    fetchUserProfile();
  }, []);
  const endPoint = `${endPoints.adminMentors}?accountId=${clientUser?.id}`;
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
            userName={clientUser?.name as string}
            accountId={clientUser?.id || ''}
            roleId={clientUser?.role?.id || ''}
            role={clientUser?.role?.name as string}
            triggerState={triggerState as boolean}
            setTriggerState={
              setTriggerState as React.Dispatch<React.SetStateAction<boolean>>
            }
          />
        </div>
        {clientUser && (
          <DataTable<Mentor>
            tag="admin-mentors"
            apiUrl={endPoint}
            columns={columns}
            searchFields={searchFields}
            filterOptions={filterOptions}
            itemsPerPage={10}
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
