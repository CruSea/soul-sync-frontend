import Image from "next/image";
import type { Channel } from "@/types/channel";
import { AiOutlineDelete } from "react-icons/ai";

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
    <div className="h-[278px] w-[200px] flex flex-col items-center justify-between px-2.5 pt-1 pb-2 border rounded-lg bg-white hover:shadow-md transition-shadow">
      <div className="h-10 px-1 py-2 rounded-tl-lg rounded-tr-lg justify-between items-center inline-flex w-full">
        <div className="px-1.5 py-0.5 rounded-xl border border-zinc-500 justify-center items-center gap-2.5 flex">
          <div className="w-[31px] h-3 text-center text-zinc-500 text-[8px] font-bold font-['Inter'] leading-3 tracking-wide">
            Active
          </div>
        </div>
        {/* <div className="w-6 h-6 px-[3px] py-[2.62px] justify-center items-center flex"></div> */}
        <AiOutlineDelete className="w-5 h-5 cursor-pointer hover:bg-[#f1f2f4] rounded-xl" />
      </div>
      <div className="relative w-16 h-16 mb-2">
        <Image
          src={iconURL}
          alt={channel.type}
          fill
          className="object-contain"
        />
      </div>
      <div className="h-[98px] w-full p-1 flex-col justify-center items-start gap-0.5 inline-flex">
        <div className="self-stretch w-full justify-between items-center inline-flex gap-7">
          <div className="h-[19px] justify-start items-center gap-2 flex">
            <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
            <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
              Name
            </div>
          </div>
          <div className="grow shrink basis-0 text-gray-900 text-xs font-bold font-['Manrope'] leading-tight tracking-tight">
            {channel.name}
          </div>
        </div>
        <div className="self-stretch justify-between items-center inline-flex gap-3">
          <div className="h-[19px] justify-start items-center gap-2 flex">
            <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
            <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
              Channel
            </div>
          </div>
          <div className="grow shrink basis-0 text-gray-900 text-xs font-bold font-['Manrope'] leading-tight tracking-tight">
            {channel.type}
          </div>
        </div>
        <div className="self-stretch justify-between items-center inline-flex gap-8">
          <div className="h-[19px] justify-start items-center gap-2 flex">
            <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
            <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
              Date
            </div>
          </div>
          <div className="grow shrink basis-0 text-gray-900 text-xs font-bold font-['Manrope'] leading-tight tracking-tight">
            {/* Jan 16,2024 */}
            {channel.Date}
          </div>
        </div>
        <div className="self-stretch justify-between items-center inline-flex gap-9">
          <div className="h-[19px] justify-start items-center gap-2 flex">
            <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
            <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
              Port
            </div>
          </div>
          <div className="grow shrink basis-0 text-gray-900 text-xs font-bold font-['Manrope'] leading-[18px] tracking-wide">
            OXXFTHRZA7
          </div>
        </div>
      </div>
    </div>
  );
}
