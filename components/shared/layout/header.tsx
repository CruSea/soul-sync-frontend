'use client';

import { FiBell } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './accountDialog';
import { LuUser } from 'react-icons/lu';
import { LuLogOut } from 'react-icons/lu';
import { removeUserProfile } from '@/actions/auth/auth';
import { useRouter } from 'next/navigation';
import type { Account, User_Info } from '@/types/users';
import { endPoints } from '@/data/end-points';
import { userProfile } from '@/actions/auth/login';
import { fetchUserProfile } from '@/actions/shared/user-profile';
import { toast } from '@/hooks/use-toast';

export function Header({ title }: { title: string }) {
  const [clientUser, setClientUser] = useState<User_Info | null>(null);
  const [profileData, setProfileData] = useState<Account | null>(null);
  const router = useRouter();

  const logOut = async () => {
    removeUserProfile();

    // Navigate to logout page
    router.push('/log-in');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userAccount: User_Info = await userProfile();
      setClientUser(userAccount);
    };
    fetchUserProfile();
  }, []);

  const profile = async () => {
    if (!clientUser) return;

    const endPoint = `${endPoints.userProfile}/${clientUser.accountId}/user/${clientUser.userId}`;

    try {
      const response = await fetchUserProfile(endPoint);
      if (response.error) {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: response.error.description,
        });
        throw new Error('Failed to fetch profile.');
      }

      setProfileData(response);

      toast({
        variant: 'success',
        title: 'Success!',
        description: 'Their is Profile.',
      });
    } catch (error) {
      // console.error(error);
    }
  };

  const goToProfile = () => {
    console.log('profile', clientUser);
    if (clientUser?.role === 'Owner') {
      router.push('/admin/get-started');
      return;
    }
    if (clientUser?.role === 'Mentor') {
      router.push('/mentor/get-started');
      return;
    }
  };

  useEffect(() => {
    if (clientUser) {
      profile();
    }
  }, [clientUser]);

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <h1 className="text-base font-normal">{title}</h1>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900">
          <FiBell className="h-5 w-5" />
        </button>
        <Dialog>
          <DialogTrigger>
            <Avatar className="w-8 h-8 cursor-pointer">
              <AvatarImage
                src={profileData?.imageUrl ?? undefined}
                className="w-full h-full object-cover"
              />
              <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
                {profileData?.userName?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent className="rounded-[6px] pt-4 pb-0 px-0 w-min translate-x-0 translate-y-0 top-12 left-auto right-2.5 ">
            <DialogHeader className="space-y-0 px-4">
              <DialogTitle className="text-start text-lg">
                {profileData?.userName}
              </DialogTitle>
              <DialogDescription className="text-base">
                {profileData?.email}{' '}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col">
              <div
                onClick={goToProfile}
                className="flex gap-2 text-lg py-2 border border-y-slate-200 border-x-0 px-4 cursor-pointer hover:bg-slate-50"
              >
                <LuUser size={25} /> Profile
              </div>
              <div
                className="flex gap-2 text-lg py-2 px-4 cursor-pointer hover:bg-slate-50"
                onClick={logOut}
              >
                <LuLogOut size={25} /> Logout
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
