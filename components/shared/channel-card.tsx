import Image from "next/image";
import type { Channel } from "@/types/channel";

interface ChannelCardProps {
  channel: Channel;
}

export function ChannelCard({ channel }: ChannelCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-white hover:shadow-md transition-shadow">
      <div className="relative w-12 h-12 mb-2">
        <Image
          src={channel.icon}
          alt={channel.name}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-sm font-medium">{channel.name}</h3>
      <p className="text-xs text-muted-foreground">{channel.type}</p>
    </div>
  );
}
