import React from 'react';
import { Header } from '@/components/shared/layout/header';
import SocketProvider from '@/context/providers/SocketProvider';
import { MentorLayoutProps } from '@/types/mentor';

export default function MentorLayout({ children, title }: MentorLayoutProps) {
  return (
    <div className="flex flex-1 flex-col h-screen">
      <Header title={title} />
      <div className="flex-1 flex p-5 gap-5 w-full overflow-hidden bg-gray-100">
        <SocketProvider>{children}</SocketProvider>
      </div>
    </div>
  );
}
