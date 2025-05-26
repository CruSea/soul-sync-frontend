'use client';

import { useEffect, useState } from 'react';
import MentorView from '@/components/views/mentor/mentor-chat';
import { getCookie } from 'cookies-next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

function MentorPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  const checkAuthorization = () => {
    try {
      const userProfileCookie = getCookie('user-profile') as string;
      const selectedOrgId = getCookie('selected-org-id') as string;

      if (!userProfileCookie || !selectedOrgId) {
        setAuthorized(false);
        return;
      }

      const profile = JSON.parse(userProfileCookie);
      const selectedAccount = profile.accounts.find(
        (account: any) => account.id === selectedOrgId
      );

      setAuthorized(selectedAccount?.role?.name === 'Mentor');
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
              You don't have Mentor privileges in the selected organization.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="text-red-500">
              Unauthorized: Required Mentor role in current organization
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return <MentorView />;
}

export default MentorPage;
