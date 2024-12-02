"use client"

import BellIcon from "@/components/shared/Icons/BellIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react"
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const UserActions = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // if the user is signed out send them to the sign in page
    if (!session) {
      router.push("/sign-in-with")
    }
  }, [session])

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div className="ml-auto flex gap-5 items-center">
      <BellIcon size={30} hasNotification={true} />
      <DropdownMenu>
        <DropdownMenuTrigger >
          <Avatar className="w-[60px] h-[60px] cursor-pointer">
            <AvatarImage
              src="/assets/avatars/woman1.png"
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
              CN
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* Sign out button */}
          <DropdownMenuLabel className="cursor-pointer" onClick={() => handleSignOut()}>Sign out</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserActions;
