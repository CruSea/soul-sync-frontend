"use client";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { FaVectorSquare } from "react-icons/fa6";
import { LuUser, LuMessagesSquare, LuMic2, LuLibrary } from "react-icons/lu";
import { RxLinkNone2 } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import Link from "next/link";
const Sidebar = () => {
  return (
    <Command className=" rounded-none">
      <CommandGroup>
        <CommandItem className="bg-secondary font-bold size-fit">
          <FaVectorSquare className="mr-2 h-4 w-4" />
          <Link href="#" className="font-bold">
            Dashboard
          </Link>
        </CommandItem>
        <CommandItem>
          <LuUser className="mr-2 h-4 w-4" />
          <Link href="#">Mentors</Link>
        </CommandItem>
        <CommandItem>
          {" "}
          <LuMessagesSquare className="mr-2 h-4 w-4" />
          <Link href="#">Meesages</Link>
        </CommandItem>
        <CommandItem>
          {" "}
          <RxLinkNone2 className="mr-2 h-4 w-4" />
          <Link href="#">Channels</Link>
        </CommandItem>
        <CommandItem>
          {" "}
          <LuMic2 className="mr-2 h-4 w-4" />
          <Link href="#">Admins</Link>
        </CommandItem>
        <CommandItem>
          {" "}
          <LuLibrary className="mr-2 h-4 w-4" />
          <Link href="#">Agents</Link>
        </CommandItem>
      </CommandGroup>

      <CommandGroup className="mt-72">
        <CommandItem>
          <LuMic2 className="mr-2 h-4 w-4" />
          <Link href="#">Help and Support.</Link>
        </CommandItem>
        <CommandItem>
          <CiSettings className="mr-2 h-4 w-4" />
          <Link href="#">Settings</Link>
        </CommandItem>
        <CommandItem className="mt-5">
          <div className="bg-secondary rounded-lg">
            <ToggleGroup type="single">
              <ToggleGroupItem className="rounded-lg" value="a">
                <MdLightMode className="mr-2 h-4 w-4" /> Light
              </ToggleGroupItem>
              <ToggleGroupItem className="rounded-lg" value="b">
                <MdDarkMode className="mr-2 h-4 w-4" /> Dark
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CommandItem>
      </CommandGroup>
    </Command>
  );
};

export default Sidebar;
