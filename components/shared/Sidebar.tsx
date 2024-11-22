"use client";
import React from "react";
import { useTheme } from "next-themes";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandSeparator,
} from "@/components/ui/command";
import { FaVectorSquare } from "react-icons/fa6";
import { LuUser, LuMessagesSquare, LuMic2, LuLibrary } from "react-icons/lu";
import { RxLinkNone2 } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import Link from "next/link";

const Sidebar = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex flex-col h-full">
      <Command className="flex-1 overflow-y-auto rounded-none">
        <CommandList>
          <CommandGroup>
            <CommandItem className="bg-gray-300 font-bold size-max text-3xl pl-4 rounded-lg">
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
              <LuMessagesSquare className="mr-2 h-4 w-4" />
              <Link href="#">Messages</Link>
            </CommandItem>
            <CommandItem>
              <RxLinkNone2 className="mr-2 h-4 w-4" />
              <Link href="#">Channels</Link>
            </CommandItem>
            <CommandItem>
              <LuMic2 className="mr-2 h-4 w-4" />
              <Link href="#">Admins</Link>
            </CommandItem>
            <CommandItem>
              <LuLibrary className="mr-2 h-4 w-4" />
              <Link href="#">Agents</Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>

      <div className="bg-white dark:bg-black p-4">
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem>
                <LuMic2 className="mr-2 h-4 w-4" />
                <Link href="#">Help and Support</Link>
              </CommandItem>
              <CommandItem>
                <CiSettings className="mr-2 h-4 w-4" />
                <Link href="#">Settings</Link>
              </CommandItem>
              <CommandItem className="mt-5">
                <div className="bg-secondary rounded-lg">
                  <ToggleGroup
                    type="single"
                    value={theme}
                    onValueChange={(value) => setTheme(value)}
                  >
                    <ToggleGroupItem value="light" className="rounded-lg">
                      <MdLightMode className="mr-2 h-4 w-4" /> Light
                    </ToggleGroupItem>
                    <ToggleGroupItem value="dark" className="rounded-lg">
                      <MdDarkMode className="mr-2 h-4 w-4" /> Dark
                    </ToggleGroupItem>
                    <ToggleGroupItem value="system" className="rounded-lg">
                      System
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
};

export default Sidebar;
