'use client';
import Chat from '@/components/shared/chat';
import { AdminLayout } from '@/components/shared/layout/admin-layout';
// import Profile from '@/components/shared/Profile';
// import Search from '@/components/shared/Search';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function MessagesView() {
  const [profileInView, setProfileInView] = useState<boolean>(false);

  return (
    <AdminLayout title="Messages">
      <div className="flex p-5 gap-5 w-full h-full overflow-hidden bg-gray-100">
        {/* <Search /> */}
        <Chat toggleProfileInView={() => setProfileInView(!profileInView)} />
        <div
          className={cn(
            'w-96 h-full flex flex-col gap-5',
            !profileInView ? 'hidden' : ''
          )}
        >
          {/* <Profile type="mentor" /> */}
        </div>
      </div>
    </AdminLayout>
  );
}
