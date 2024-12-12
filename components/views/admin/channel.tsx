"use client";

import { useState } from "react";
import { AddChannelDialog } from "@/components/shared/add-channel-dialog";
import { ChannelCard } from "@/components/shared/channel-card";
import type { Channel } from "@/types/channel";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

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
    <div className="h-fit min-h-dvh container mx-auto p-10 ">
      <div className="h-fit min-h-dvh space-y-6  bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">List of Channels</h1>
          <p className="text-sm text-muted-foreground">
            {channels.length} channels added
          </p>
        </div>

        <Command className="w-full">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList className="">
            <CommandEmpty>Channel Not Found</CommandEmpty>
            <div className="grid gap-4">
              <CommandGroup className="p-2">
                <div className="grid grid-cols- sm:grid-cols-1 md:grid-cols-3 md:gap-10 lg:grid-cols-5 lg:gap-2">
                  {channels.map((channel) => (
                    <CommandItem
                      key={channel.id}
                      className="flex-1 w-fit"
                    >
                      <ChannelCard key={channel.id} channel={channel} />
                    </CommandItem>
                  ))}
                  <CommandItem>
                    <AddChannelDialog onAddChannel={handleAddChannel} />
                  </CommandItem>
                </div>
              </CommandGroup>
            </div>
          </CommandList>
        </Command>
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
