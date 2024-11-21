import NavMenu from "./NavMenu";
import UserActions from "./UserActions";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


import CurrentTime from './CurrentTime';
import Dropdown from './Dropdown';


import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import { LuSun } from "react-icons/lu";
import BellIcon from "@/components/shared/Icons/BellIcon";


const Header = () => {
  return (
    <header className="w-full h-24 flex items-center border-b border-gray-200 px-7 ">
        <Dropdown />
        <NavMenu />
        <UserActions />

      </header>
  )
}

export default Header;