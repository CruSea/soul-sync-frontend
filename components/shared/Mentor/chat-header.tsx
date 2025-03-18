import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../../ui/button';
import { getFallBack } from '@/lib/utils';
import { ChatHeaderProps } from '@/types/mentor';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './metor-sheet';
import Profile from './Profile';

const ChatHeader = ({ platform, id }: ChatHeaderProps) => {
  return (
    <CardHeader className="w-full bg-neutral-300 rounded-t-lg shadow-custom-chat flex flex-row justify-between px-5 py-2.5">
      <div className="flex gap-2.5 items-center">
        <div className="flex flex-col gap-0">
          <CardTitle className="font-bold text-2xl mb-[-5px]">{id}</CardTitle>
          <CardDescription className="font-bold text-xs text-neutral-500 ">
            {platform}
          </CardDescription>
        </div>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
