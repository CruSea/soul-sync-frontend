"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, getFallBack } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UsersListProps } from "@/types/mentor";

const UsersList = ({ users, currentUser, setCurrentUser }: UsersListProps) => {

  return (
    <div className="w-80 overflow-y-auto bg-white rounded-[10px] py-4 shadow-sidebar">
      <Command className="px-0">
        {/* the user search box */}
        <CommandInput
          placeholder="Search for a Message"
          className="border-[1px] border-zinc-200 px-2 mx-2 py-1 box-border "
        />

        {/* a list of the users */}
        <ScrollArea>
          <CommandList className="py-1 h-full bg-white max-h-none overflow-y-auto">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="p-3 flex flex-col">
              {/* a an individual user */}
              {users.map((user) => (
                <CommandItem
                  key={user.userId}
                  className={cn(
                    "flex px-2.5 gap-3.5 items-center h-[70px] outline-none rounded-lg cursor-pointer",
                    user.userId === currentUser.userId
                      ? "!bg-gray-300"
                      : "bg-white"
                  )} // if user is selected sets the background to gry
                  onSelect={() => setCurrentUser(user)} // sets the chosen user to the index of the selected item
                >
                  {/* Avatar image a user */}
                  <Avatar className="w-[32px] h-[32px]">
                    <AvatarImage
                      src={user.imageUrl}
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback className="w-full h-full flex items-center justify-center text-base">
                      {getFallBack(user.fullName)}
                    </AvatarFallback>
                  </Avatar>

                  {/* user information */}
                  <div className="flex flex-col justify-center">
                    <div className="font-bold text-base">{user.fullName}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </ScrollArea>
      </Command>
    </div>
  );
};

export default UsersList;
