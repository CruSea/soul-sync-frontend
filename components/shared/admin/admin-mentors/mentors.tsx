'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import DataTable from '@/components/shared/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Column, FilterOption } from '@/types/data-table';
import { toast } from '@/hooks/use-toast';
import { InviteMentorDialog } from './invite-mentor-dialog';
import { endPoints } from '@/data/end-points';
import { deleteMentor, toggleMentorStatus } from '@/actions/admin/admin';
import type { Account } from '@/types/users';
import { userProfile } from '@/actions/auth/login';
import { Mentor } from '@/types/mentor';
import { Switch } from '@/components/ui/switch';

const createColumns = (
  client: Account | null,
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>
): Column<Mentor>[] => [
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
    render: (mentor: Mentor) => (mentor.age === null ? 'N/A' : mentor.age),
  },
  { key: 'gender', header: 'Gender' },
  {
    key: 'expertise',
    header: 'Expertise',
    render: (mentor: Mentor) =>
      mentor.expertise
        ? Object.entries(mentor.expertise)
            .map(([key, description]) => `${key}: ${description}`)
            .join(', ')
        : 'N/A',
  },
  {
    key: 'availability',
    header: 'Availability',
    render: (mentor: Mentor) =>
      mentor.availability
        ? Object.entries(mentor.availability)
            .map(([day, times]) => `${day}: ${times.join(', ')}`)
            .join('; ')
        : 'N/A',
  },
  {
    key: 'capacity',
    header: 'Capacity',
    render: (mentor: Mentor) =>
      mentor.capacity === null ? 'N/A' : mentor.capacity,
  },
  {
    key: 'location',
    header: 'Location',
    render: (mentor: Mentor) => (mentor.location ? mentor.location : 'N/A'),
  },
  {
    key: 'isActive',
    header: 'Status',
    render: (mentor: Mentor) => (
      <div className="flex items-center gap-2">
        <Switch
          checked={mentor.isActive}
          onCheckedChange={async (checked) => {
            try {
              if (!client?.id) {
                throw new Error('User account ID missing');
              }

              await toggleMentorStatus(String(mentor.id), client.id, checked);

              mentor.isActive = checked;
              setTriggerState((prev) => !prev);

              toast({
                variant: 'success',
                title: 'Status Updated!',
                description: `Mentor status has been ${checked ? 'activated' : 'deactivated'}.`,
              });
            } catch (error) {
              console.error('Status toggle error:', error);
              toast({
                variant: 'destructive',
                title: 'Error!',
                description:
                  error instanceof Error
                    ? error.message
                    : 'Failed to update mentor status',
              });
            }
          }}
        />
        <Badge variant={mentor.isActive ? 'default' : 'secondary'}>
          {mentor.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </div>
    ),
  },
];

const filterOptions: FilterOption<Mentor>[] = [
  { key: 'gender', label: 'FEMALE' },
  { key: 'gender', label: 'MALE' },
];

const searchFields: (keyof Mentor)[] = ['name', 'email', 'gender', 'isActive'];

const MentorsTable: React.FC = () => {
  const [clientUser, setClientUser] = useState<Account | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [triggerState, setTriggerState] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userAccount: Account = await userProfile();
      setClientUser(userAccount);
    };
    fetchUserProfile();
  }, []);

  const endPoint = `${endPoints.adminMentors}?accountId=${clientUser?.id}`;
  const [itemsPerPage, onItemsPerPageChange] = useState<number>(10);

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
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'An error occurred while deleting the mentor.',
      });
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
            columns={createColumns(clientUser, setTriggerState)}
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
