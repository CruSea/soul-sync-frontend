'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronLeft, FiHelpCircle } from 'react-icons/fi';

import { LuUser, LuMessagesSquare, LuMic2, LuLibrary } from 'react-icons/lu';
import { RxLinkNone2 } from 'react-icons/rx';
import { CiSettings } from 'react-icons/ci';
import { LayoutDashboardIcon as LuLayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: LuLayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: LuUser, label: 'Mentors', href: '/admin/mentors' },
  { icon: LuUser, label: 'Mentees', href: '/admin/mentees' },
  { icon: LuMessagesSquare, label: 'Messages', href: '/admin/messages' },
  { icon: RxLinkNone2, label: 'Channels', href: '/admin/channels' },
  { icon: LuMic2, label: 'Admins', href: '/admin/admins' },
  { icon: LuLibrary, label: 'Agents', href: '/admin/agents' },
];

const footerItems = [
  { icon: FiHelpCircle, label: 'Help and Support', href: '/support' },
  { icon: CiSettings, label: 'Setting', href: '/settings' },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'flex h-screen flex-col border-r bg-white transition-all duration-300',
        isCollapsed ? 'w-[60px]' : 'w-[240px]'
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!isCollapsed && <span className="text-xl font-semibold">TURUMBA</span>}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FiChevronLeft
            className={cn(
              'h-4 w-4 transition-transform',
              isCollapsed && 'rotate-180'
            )}
          />
        </Button>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center space-x-2 rounded-md px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100',
              pathname === item.href && 'bg-gray-100',
              isCollapsed && 'justify-center'
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
      <div className="space-y-1 border-t px-2 py-4">
        {footerItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center space-x-2 rounded-md px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100',
              pathname === item.href && 'bg-gray-100',
              isCollapsed && 'justify-center'
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
