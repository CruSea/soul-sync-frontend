"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


interface User {
  id: string,
  name: string,
  fallback: string,
  description: string
}


const Search = () => {
  const [chosenUser, setChosenUser] = useState<number>(0)

  // dummy user objects
  const users:User[] = [
    {
      id: uuidv4(),
      name: "Jennie Doe",
      fallback: "JD",
      description: "Mentor : Regina Phalange",
    },
    {
      id: uuidv4(),
      name: "John Smith",
      fallback: "JS",
      description: "Mentor : Monica Geller",
    },
    {
      id: uuidv4(),
      name: "Alice Johnson",
      fallback: "AJ",
      description: "Mentor : Chandler Bing",
    }
  ];

  return (
    <div className="w-96 overflow-y-auto bg-white rounded-[10px] py-4 shadow-sidebar">
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
            {users.map((user, index) => 
              <CommandItem 
                key={user.id} 
                className={cn("flex px-2.5 gap-3.5 items-center h-[70px] outline-none rounded-lg cursor-pointer", index == chosenUser ? "!bg-gray-300" : "bg-white")} // if user is selected sets the background to gry
                onSelect={() => setChosenUser(index)} // sets the chosen user to the index of the selected item
              >
                {/* Avatar image a user */}
                <Avatar className="w-[32px] h-[32px]">
                  <AvatarImage
                    src="/assets/avatars/man1.png"
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
                    {user.fallback}
                  </AvatarFallback>
                </Avatar>

                {/* user information */}
                <div className="flex flex-col justify-center">
                  <div className="font-bold text-base">{user.name}</div>
                  <div className="font-normal text-sm text-neutral-400">{user.description}</div>
                </div>
              </CommandItem>
            )}
          </CommandGroup>
        </CommandList>
        </ScrollArea>
      </Command>
    </div>
  );
};

export default Search;
