'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import DataTable from '@/components/shared/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Column, FilterOption } from '@/types/data-table';
import { toast } from '@/hooks/use-toast';
import { InviteAdminDialog } from './invite-admin-dialog';
import { toggleAdminStatus, deleteAdmin } from '@/actions/admin/admin';
import type { Account } from '@/types/users';
import { endPoints } from '@/data/end-points';
import { userProfile } from '@/actions/auth/login';
import { Admin } from '@/types/admin';
import { GetRole } from '@/actions/admin/admin';
import { Switch } from '@/components/ui/switch';

const createColumns = (
  client: Account | null,
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>
): Column<Admin>[] => [
  {
    key: 'name',
    header: 'Name',
    render: (admin: Admin) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{admin.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        {admin.name}
      </div>
    ),
  },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  {
    key: 'status',
    header: 'Status',
    render: (admin: Admin) => (
      <div className="flex items-center gap-2">
        <Switch
          checked={admin.status === 'Active'}
          onCheckedChange={async (checked) => {
            try {
              if (!client?.id) {
                throw new Error('User account ID missing');
              }
              
              await toggleAdminStatus(String(admin.id), client.id, checked);
              
              admin.status = checked ? 'Active' : 'Inactive';
              setTriggerState((prev) => !prev); 
              
              toast({
                variant: 'success',
                title: 'Status Updated!',
                description: `Admin status has been ${checked ? 'activated' : 'deactivated'}.`,
              });
            } catch (error) {
              console.error('Status toggle error:', error);
              toast({
                variant: 'destructive',
                title: 'Error!',
                description: error instanceof Error ? error.message : 'Failed to update admin status',
              });
            }
          }}
        />
        <Badge variant={admin.status === 'Active' ? 'default' : 'secondary'}>
          {admin.status || 'Inactive'}
        </Badge>
      </div>
    ),
  }
  
];

const AdminsTable: React.FC = () => {
  const [clientUser, setClientUser] = useState<Account | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [triggerState, setTriggerState] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, onItemsPerPageChange] = useState<number>(10);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userAccount: Account = await userProfile();
        setClientUser(userAccount);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast({ variant: 'destructive', title: 'Error!', description: 'Failed to load user profile.' });
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchRoleId = async () => {
      if (!clientUser?.id) return;
      try {
        const response = await GetRole(`roles`);
        console.log('role response', response)
        if (response.error) {
          toast({ variant: 'destructive', title: 'Error!', description: response.error.description });
          throw new Error('Failed to fetch role ID.');
        }
  
        const adminRole = response.find((role: { name: string }) => role.name === "Admin");
  
        if (adminRole) {
          setRoleId(adminRole.id);
        } else {
          toast({
            variant: 'destructive',
            title: 'Warning!',
            description: 'No Admin role found.',
          });
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: 'An error occurred while fetching the role ID.',
        });
      }
    };
  
    fetchRoleId();
  }, [clientUser]);
  

  const endPoint = `${endPoints.invitedAdmins}?accountId=${clientUser?.id}&roleId=${roleId}`;

  const handleDelete = async (id: string | number) => {
    if (!clientUser?.id) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'User account ID is missing.',
      });
      return;
    }
  
    try {
      const response = await deleteAdmin(String(clientUser.id), String(id));
      console.log('accountId is', clientUser.id);
      console.log('user id is', id)
      if (response.error) {
        toast({ variant: 'destructive', title: 'Error!', description: response.error.description });
        throw new Error('Failed to delete the admin.');
      }
      setTriggerState(!triggerState);
      toast({ variant: 'success', title: 'Success!', description: 'Admin successfully deleted.' });
    } catch {
      toast({ variant: 'destructive', title: 'Error!', description: 'An error occurred while deleting the admin.' });
    }
  };
  

  return (
    <div className="flex-1 p-4 bg-secondary dark:bg-gray-900">
      <div className="space-y-6 bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admins</h1>
          <InviteAdminDialog
            userName={clientUser?.name || ''}
            accountId={clientUser?.id || ''}
            role={clientUser?.role?.name || ''}
            roleId={roleId || ''}
            triggerState={triggerState}
            setTriggerState={setTriggerState}
          />
        </div>
        {clientUser && (
          <DataTable<Admin>
            tag="invited-admin"
            apiUrl={endPoint}
            columns={createColumns(clientUser, setTriggerState)}
            searchFields={['name', 'email', 'status']}
            filterOptions={[{ key: 'status', label: 'Yes' }, { key: 'status', label: 'No' }]}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onDelete={handleDelete}
            triggerState={triggerState}
            setTriggerState={setTriggerState}
            transformData={(data) => {
              return data.sort((a:Admin, b:Admin) => {
                if (a.role === 'Owner') return -1;
                if (b.role === 'Owner') return 1;
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminsTable;
