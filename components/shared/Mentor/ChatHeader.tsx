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

const ChatHeader = ({
  imageUrl,
  fullName,
  email,
  toggleDrawer,
  userDetails,
}: ChatHeaderProps) => {
  return (
    <CardHeader className="w-full bg-neutral-300 rounded-t-lg shadow-custom-chat flex flex-row justify-between px-5 py-2.5">
      <div className="flex gap-2.5 items-center">
        <Avatar className="w-[50px] h-[50px]">
          <AvatarImage src={imageUrl} className="w-full h-full object-cover" />
          <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
            {getFallBack(fullName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-0">
          <CardTitle className="font-bold text-2xl mb-[-5px]">
            {fullName}
          </CardTitle>
          <CardDescription className="font-bold text-xs text-neutral-500 ">
            {email}
          </CardDescription>
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild className="3xl:hidden">
          <Button
            className="bg-white text-black font-medium text-sm hover:bg-white hover:opacity-80 "
            onClick={toggleDrawer}
          >
            View Profile
          </Button>
        </SheetTrigger>
        <SheetContent className="py-12 w-min ">
          <SheetHeader>
            <SheetTitle className="sr-only">shows the profiles info</SheetTitle>
          </SheetHeader>
          <Profile userDetails={userDetails} />
        </SheetContent>
      </Sheet>
    </CardHeader>
  );
};

export default ChatHeader;
