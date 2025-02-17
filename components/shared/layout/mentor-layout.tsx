import React from 'react';
import { Header } from '@/components/shared/layout/header';
import SocketProvider from '@/context/providers/SocketProvider';
interface MentorLayoutProp {
  children: React.ReactNode;
  title: string;
}

export default function MentorLayout({ children, title }: MentorLayoutProp) {
  return (
    <div className="flex flex-1 flex-col h-screen">
      <Header title={title} />
      <div className="flex-1 flex p-5 gap-5 w-full overflow-hidden bg-gray-100">
        <SocketProvider>{children}</SocketProvider>
      </div>
    </div>
  );
}
