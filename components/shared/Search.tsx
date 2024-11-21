import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { cn } from "../../lib/utils.ts"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Search = () => {

  const users = [
    {
      id: 1,
      name: "Jennie Doe",
      fallback: "JD",
      description: "Mentor : Regina Phalange",
      clicked: true
    },
    {
      id: 2,
      name: "John Smith",
      fallback: "JS",
      description: "Mentor : Monica Geller",
      clicked: false

    },
    {
      id: 3,
      name: "Alice Johnson",

      fallback: "AJ",
      description: "Mentor : Chandler Bing",
      clicked: false

    },
  ];

  return (
    <div className="w-96 h-full bg-white rounded-[10px] py-4">
      <Command className="px-0">
        <CommandInput
          placeholder="Search for a Message"
          className="border-[1px] border-zinc-200 px-2 mx-2 py-1 box-border "
        />
        <CommandList className="py-1 h-full bg-white">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="p-3 flex flex-col">
            
            {users.map(user => 
              <CommandItem className={cn("flex px-2.5 gap-3.5 items-center h-[70px] outline-none rounded-lg cursor-pointer", user.clicked ? "!bg-[#d9d9d9]" : "bg-white")}>
              <Avatar className="w-[32px] h-[32px]">
                <AvatarImage
                  src="/assets/avatars/man1.png"
                  className="w-full h-full object-cover"
                />
                <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
                  {user.fallback}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center">
                <div className="font-bold text-base">{user.name}</div>
                <div className="font-normal text-sm text-neutral-400">{user.description}</div>
              </div>
            </CommandItem>
            )}
          </CommandGroup>

        </CommandList>
      </Command>
    </div>
  );
};

export default Search;
