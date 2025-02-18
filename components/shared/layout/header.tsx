'use client';

import { FiBell } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../admin/logout-dialog';
import { removeUserProfile } from '@/actions/auth/auth';
import { useRouter } from 'next/navigation';

export function Header({ title }: { title: string }) {
  const router = useRouter();

  const logOut = async () => {
    removeUserProfile();

    // Navigate to logout page
    await router.push('/log-in');
  };

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <h1 className="text-base font-normal">{title}</h1>
      <Dialog>
        <DialogTrigger>
          <div className="flex items-center space-x-4">
            <FiBell className="h-5 w-5" />
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage
                src="/assets/avatars/woman1.png"
                className="w-full h-full object-cover"
              />
              <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
                CN
              </AvatarFallback>
            </Avatar>
          </div>
        </DialogTrigger>
        <DialogContent className=" top-4">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <div className="cursor-pointer" onClick={logOut}>
              log out
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
}
