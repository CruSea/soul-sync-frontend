'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FiMenu, FiHelpCircle } from 'react-icons/fi';
import { LuUser, LuMessagesSquare, LuMic, LuLibrary } from 'react-icons/lu';
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
    { icon: LuMic, label: 'Admins', href: '/admin/admins' },
    { icon: LuLibrary, label: 'Agents', href: '/admin/agents' },
];

const footerItems = [
    { icon: FiHelpCircle, label: 'Help and Support', href: '/support' },
    { icon: CiSettings, label: 'Setting', href: '/settings' },
];

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            setIsCollapsed(mobile); // Collapse by default on mobile
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Collapse sidebar on mobile navigation
        if (isMobile) {
            setIsCollapsed(true);
        }
    }, [pathname, isMobile]);

    return (
        <>
            {/* Backdrop for mobile */}
            {isMobile && !isCollapsed && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-30 lg:hidden"
                    onClick={() => setIsCollapsed(true)}
                />
            )}

            {/* Mobile Hamburger Button (when sidebar is collapsed) */}
            {isMobile && isCollapsed && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="fixed top-4 left-2 z-50 h-10 w-10 bg-white shadow rounded-full"
                    onClick={() => setIsCollapsed(false)}
                >
                    <FiMenu className="h-6 w-6" />
                </Button>
            )}

            {/* Sidebar Container with Slide Animation */}
            <div
                className={cn(
                    'fixed lg:static z-40 flex h-screen flex-col border-r bg-white transition-transform duration-300 ease-in-out',
                    isMobile
                        ? isCollapsed
                            ? '-translate-x-full'
                            : 'translate-x-0'
                        : 'translate-x-0',
                    isMobile ? 'w-[240px]' : isCollapsed ? 'w-[60px]' : 'w-[240px]'
                )}
            >
                {/* Header */}
                <div className="flex h-14 items-center justify-between border-b px-4">
                    {!isCollapsed && (
                        <span className="text-xl font-semibold">LEYU-CHAT</span>
                    )}
                </div>

                {/* Menu Items */}
                <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => isMobile && setIsCollapsed(true)} // Collapse on navigation in mobile
                            className={cn(
                                'flex items-center space-x-3 rounded-md px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100',
                                pathname === item.href && 'bg-gray-100',
                                isCollapsed && 'justify-center space-x-0'
                            )}
                        >
                            <item.icon className="h-5 w-5 shrink-0" />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                {/* Footer Items */}
                <div className="space-y-1 border-t px-2 py-4">
                    {footerItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => isMobile && setIsCollapsed(true)} // Collapse on navigation in mobile
                            className={cn(
                                'flex items-center space-x-3 rounded-md px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100',
                                pathname === item.href && 'bg-gray-100',
                                isCollapsed && 'justify-center space-x-0'
                            )}
                        >
                            <item.icon className="h-5 w-5 shrink-0" />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}