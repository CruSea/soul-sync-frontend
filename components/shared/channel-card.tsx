import Image from "next/image";
import type { Channel } from "@/types/channel";

interface ChannelCardProps {
  channel: Channel;
}

export function ChannelCard({ channel }: ChannelCardProps) {
  let iconURL = "";
  switch (channel.type) {
    case "Telegram Bot":
      iconURL = "/telegram.png";
      break;
    case "Negarit":
      iconURL = "/negarit.png";
      break;
    case "WhatsApp":
      iconURL = "/Whatsapp.png";
      break;
    case "Facebook":
      iconURL = "/Facebook.svg";
      break;
    default:
      iconURL = "";
      break;
  }
  return (
    <div className="h-[232px] flex flex-col items-center justify-center p-6 border rounded-lg bg-white hover:shadow-md transition-shadow">
      <div className="relative w-12 h-12 mb-2">
        <Image
          src={iconURL}
          alt={channel.type}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-sm font-medium">{channel.name}</h3>
      <p className="text-xs text-muted-foreground">{channel.type}</p>
    </div>
  );
}
