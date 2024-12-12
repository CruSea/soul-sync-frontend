"use client";

import { useState } from "react";
import { AddChannelDialog } from "@/components/shared/add-channel-dialog";
import { ChannelCard } from "@/components/shared/channel-card";
import type { Channel } from "@/types/channel";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialChannels: Channel[] = [
  {
    id: "1",
    name: "My SMS",
    type: "Negarit",
    apiKey: "key1",
    webhookUrl: "https://example.com/webhook1",
    customGreeting: "Welcome!",
    icon: "/negarit.png",
    Date: "Jan 16,2024",
  },
  {
    id: "2",
    name: "Soul Sync Bot",
    type: "Telegram Bot",
    apiKey: "key2",
    webhookUrl: "https://example.com/webhook2",
    customGreeting: "Welcome!",
    icon: "/telegram.png",
    Date: "Jan 16,2024",
  },
  {
    id: "3",
    name: "Soul Sync",
    type: "WhatsApp",
    apiKey: "key3",
    webhookUrl: "https://example.com/webhook3",
    customGreeting: "Welcome!",
    icon: "/Whatsapp.png",
    Date: "Jan 16,2024",
  },
];

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    "Telegram Bot",
    "WhatsApp",
    "Negarit",
    "Facebook",
    "Twilio",
  ];
  const filteredChannel = channels.filter(
    (item) =>
      (selectedCategory === "All" || item.type === selectedCategory) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );
  const format: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const handleAddChannel = (
    newChannel: Omit<Channel, "id" | "icon" | "Date">
  ) => {
    const channelWithId: Channel = {
      ...newChannel,
      id: `${channels.length + 1}`,
      icon: `/${newChannel.type.toLowerCase().replace(" ", "-")}-icon.svg`,
      Date: `${new Date().toLocaleDateString("en-US", format)}`,
    };
    setChannels([...channels, channelWithId]);
    console.log(channelWithId); // send this to back end
  };

  return (
    <div className="h-fit min-h-screen container mx-auto p-10 ">
      <div className="h-fit min-h-screen space-y-6  bg-white p-6 rounded-lg ">
        <div className="flex items-center justify-between mb-6 px-3 pt-3">
          <h1 className="text-2xl font-bold">List of Channels</h1>
          <p className="text-sm text-muted-foreground">
            {channels.length} channels added
          </p>
        </div>
        <div className="flex items-center justify-center bg-background p-4 h-dvh">
          <Command className=" w-full max-w-full h-full flex flex-col">
            <div className="flex items-center p-1 border-b pb-6">
              <CommandInput
                placeholder="Search..."
                value={search}
                onValueChange={setSearch}
                className="flex-grow border px-4 w-full"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-2">
                    {selectedCategory}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onSelect={() => setSelectedCategory(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CommandList className="flex-grow overflow-none h-full">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="h-full">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-[repeat(auto-fit,minmax(min-content,1fr))] gap-4 p-4 h-full">
                  {filteredChannel.map((channel) => (
                    <CommandItem
                      key={channel.id}
                      className="w-auto flex flex-col items-center justify-center h-full min-h-[100px] rounded-xl"
                    >
                      <ChannelCard key={channel.id} channel={channel} />
                    </CommandItem>
                  ))}
                  <AddChannelDialog onAddChannel={handleAddChannel} />
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="grid grid-cols- sm:grid-cols-1 md:grid-cols-3 md:gap-10 lg:grid-cols-5 lg:gap-2">
  {channels.map((channel) => (
    <ChannelCard key={channel.id} channel={channel} />
  ))}
  <AddChannelDialog onAddChannel={handleAddChannel} />
</div>; */
}
