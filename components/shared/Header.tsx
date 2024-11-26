"use client"

import BellIcon from "@/components/shared/Icons/BellIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react"

import NavMenu from "./NavMenu";
import UserActions from "./UserActions";
import Dropdown from './Dropdown';
import { Separator } from "@/components/ui/separator";

const Header = () => {
  return (
    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div class="flex h-14 items-center px-8">
        <Dropdown />
        <NavMenu />
        <UserActions />
      </div>
    </header>
    // <header className="w-full h-24 flex items-center border-b border-gray-200 px-7 ">
    //   <Dropdown />
    //   <NavMenu />
    //   <UserActions />
    // </header>
  )
}

export default Header;