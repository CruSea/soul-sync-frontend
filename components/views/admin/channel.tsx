"use client";

import { useState } from "react";
import { AddChannelDialog } from "@/components/shared/add-channel-dialog";
import { ChannelCard } from "@/components/shared/channel-card";
import type { Channel } from "@/types/channel";

const initialChannels: Channel[] = [
  {
    id: "1",
    name: "Negarit",
    type: "Negarit",
    apiKey: "key1",
    webhookUrl: "https://example.com/webhook1",
    customGreeting: "Welcome!",
    icon: "/negarit.png",
  },
  {
    id: "2",
    name: "Telegram",
    type: "Telegram Bot",
    apiKey: "key2",
    webhookUrl: "https://example.com/webhook2",
    customGreeting: "Welcome!",
    icon: "/telegram.png",
  },
  {
    id: "3",
    name: "WhatsApp",
    type: "WhatsApp",
    apiKey: "key3",
    webhookUrl: "https://example.com/webhook3",
    customGreeting: "Welcome!",
    icon: "/Whatsapp.png",
  },
];

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>(initialChannels);

  const handleAddChannel = (newChannel: Omit<Channel, "id" | "icon">) => {
    const channelWithId: Channel = {
      ...newChannel,
      id: `${channels.length + 1}`,
      icon: `/${newChannel.type.toLowerCase().replace(" ", "-")}-icon.svg`,
    };
    setChannels([...channels, channelWithId]);
  };

  return (
    <div className="h-svh container mx-auto p-10 ">
      <div className="h-full space-y-6  bg-white p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">List of Channels</h1>
          <p className="text-sm text-muted-foreground">
            {channels.length} channels added
          </p>
        </div>
        <div className="grid grid-cols- sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
          <AddChannelDialog onAddChannel={handleAddChannel} />
        </div>
      </div>
    </div>
  );
}
