"use client"

import BellIcon from "@/components/shared/Icons/BellIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react"


const UserActions = () => {
  return (
    <div class="flex flex-1 items-center justify-between gap-5 md:justify-end">
      <BellIcon size={24} hasNotification={true} />
      <Avatar className="w-[44px] h-[44px] cursor-pointer">
        <AvatarImage
          src="/assets/avatars/woman1.png"
          className="w-full h-full object-cover"
        />
        <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
          CN
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserActions;
