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
import { LuUser, LuMessagesSquare, LuMic2, LuLibrary } from "react-icons/lu";
import { RxLinkNone2 } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import Link from "next/link";
import { LayoutDashboardIcon as LuLayoutDashboard } from "lucide-react";

const Sidebar = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex flex-col h-full">
      <Command className="flex-1 overflow-y-auto rounded-none">
        <CommandList>
          <CommandGroup>
            <CommandItem className="px-3 py-2 bg-gray-400 text-white rounded-lg m-5 font-bold">
              <div className="flex items-center space-x-2 px-2 py-3">
                <LuLayoutDashboard className="mr-2 h-4 w-4" />
                <span className="text-xl font-semibold">Dashboard</span>
              </div>
            </CommandItem>
            <div className="space-y-3 py-3 px-3">
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
            </div>
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
