'use client';

import { useEffect, useState } from 'react';
import AdminView from '@/components/views/admin/dashboard';
import type { User } from '@/types/users';
import { getCookie } from 'cookies-next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

function UserPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  const checkAuthorization = () => {
    try {
      const userProfileCookie = getCookie('user-profile') as string;
      const selectedOrgId = getCookie('selected-org-id') as string;

      if (!userProfileCookie || !selectedOrgId) {
        setAuthorized(false);
        return;
      }

      const profile = JSON.parse(userProfileCookie) as User;
      const selectedAccount = profile.accounts?.find(
        (account) => account.id === selectedOrgId
      );

      setAuthorized(selectedAccount?.role?.name === 'Owner');
    } catch (err) {
      console.error('Authorization check failed:', err);
      setAuthorized(false);
    }
  };

  useEffect(() => {
    checkAuthorization();
  }, []);

  if (authorized === null) {
    return <div>Loading...</div>;
  }

  if (!authorized) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Access Denied</DialogTitle>
            <DialogDescription>
              You don't have Owner privileges in the selected organization.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="text-red-500">
              Unauthorized: Required Owner role in current organization
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return <AdminView />;
}

export default UserPage;
