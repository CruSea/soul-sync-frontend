'use client';

import { Header } from '@/components/shared/layout/header';
import { Sidebar } from '@/components/shared/layout/sidebar';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="lg:flex relative min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div
        className={`
          flex flex-col transition-all duration-300
          lg:ml-0 lg:flex-1
          ml-12
        `}
      >
        <Header title={title} />
        <main className="w-full overflow-auto">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}
