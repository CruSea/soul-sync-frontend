'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/shared/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Column, FilterOption } from '@/types/data-table';
import { toast } from '@/hooks/use-toast';
import { InviteMentorDialog } from './invite-mentor-dialog';
import { endPoints } from '@/data/end-points';
import { deleteMentor } from '@/actions/admin/admin';
import { Account } from '@/types/users';
import { useRouter } from 'next/navigation';
import { userProfile } from '@/actions/auth/login';
interface Mentors {
  id: string | number;
  name: string;
  expertise: string;
  age: number;
  gender: string;
  location: string;
  availability: { startDate: string };
  isActive: boolean;
  profileImage: string;
  user: { name: string; imageUrl: string };
}

const columns: Column<Mentors>[] = [
  {
    key: 'name',
    header: 'Name',
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
  { key: 'age', header: 'Age' },
  { key: 'gender', header: 'Gender' },
  { key: 'expertise', header: 'Expertise' },
  {
    key: 'availability',
    header: 'Availability',
    render: (mentor) => mentor.availability?.startDate,
  },
  { key: 'location', header: 'Location' },
  {
    key: 'isActive',
    header: 'Is Active',
    render: (mentor) => (
      <Badge variant="secondary">
        {mentor?.isActive
          ? 'Yes'
          : 'isActive Not found, change to No when you fix the schema'}
      </Badge>
    ),
  },
];

const filterOptions: FilterOption<Mentors>[] = [
  { key: 'location', label: 'Addis Ababa' },
];
const search = ['name', 'age', 'gender', 'location', 'isActive'];
const MentorsTable: React.FC = () => {
  const [clientUser, setClientUser] = useState<Account|null>(null);
  const router = useRouter();
 useEffect(() => {
    const fetchUserProfile = async () => {
      const userAccoutId: Account = await userProfile();
      setClientUser(userAccoutId);
    };
    fetchUserProfile();
  }, []);

  const endPoint = `${endPoints.adminMentors}?accountId=${clientUser?.id as string}`;

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

      toast({
        title: 'Success!',
        description: 'Mentor Successfully deleted.',
      });
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Mentors</h1>
          <InviteMentorDialog
            userName={clientUser?.name as string}
            accountId={clientUser?.id as string}
            roleId={clientUser?.role?.id as string}
            roleName={clientUser?.role?.name as string}
          />
        </div>
        <DataTable<Mentors>
          tag="admin-mentors"
          apiUrl={endPoint}
          columns={columns}
          searchFields={search as []}
          filterOptions={filterOptions}
          itemsPerPage={10}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
export default MentorsTable;
