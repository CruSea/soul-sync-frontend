import Image from "next/image";
import type { Channel } from "@/types/channel";
import { AiOutlineDelete } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ChannelCardProps {
  channel: Channel;
  setChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
  toast: (props: {
    title: string;
    description: string;
    duration?: number;
  }) => void;
}

export function ChannelCard({ channel, setChannels, toast }: ChannelCardProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  let iconURL = "";
  switch (channel.Metadata.type) {
    case "Telegram Bot":
      iconURL = "/telegram.png";
      break;
    case "Negarit SMS":
      iconURL = "/negarit.png";
      break;
    case "WhatsApp":
      iconURL = "/Whatsapp.png";
      break;
    case "Facebook":
      iconURL = "/Facebook.svg";
      break;
    case "Twilio":
      iconURL = "/Twilio.png";
      break;
    default:
      iconURL = "";
      break;
  }
  const handleDelete = (channel: Channel) => {
    setDeleteId(channel.id);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setChannels((prevItems) =>
        prevItems.filter((item) => item.id !== deleteId)
      );
      fetch(`http://localhost:3001/channels/${deleteId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Deleted channel:", data);
          // Show toast notification after successful deletion
          toast({
            title: "Channel deleted successfully",
            description: "The channel has been deleted from the list",
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          toast({
            title: "Error deleting channel",
            description: "An error occurred while deleting the channel.",
            duration: 3000,
          });
        });

      setDeleteId(null);
    }
  };
  const channelChange = (channel: Channel) => {
    switch (channel.Metadata.type) {
      case "Telegram Bot":
        return (
          <div className="self-stretch justify-between items-center inline-flex gap-9">
            <div className="h-[19px] justify-start items-center gap-2 flex">
              <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
              <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
                ApiKey
              </div>
            </div>
            <div className="grow shrink basis-0 text-gray-900 text-xs font-bold font-['Manrope'] leading-[18px] tracking-wide">
              {channel.Config.apiKey}
            </div>
          </div>
        );
      case "Negarit SMS":
        return (
          <div>
            <div className="self-stretch justify-between items-center inline-flex gap-9">
              <div className="h-[19px] justify-start items-center gap-2 flex">
                <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
                <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
                  Token
                </div>
              </div>
              <div className="grow shrink basis-0 text-gray-900 text-xs font-bold font-['Manrope'] leading-[18px] tracking-wide">
                {channel.Config.token}
              </div>
            </div>
            <div className="self-stretch justify-between items-center inline-flex gap-9">
              <div className="h-[19px] justify-start items-center gap-2 flex">
                <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
                <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
                  Campaign ID
                </div>
              </div>
              <div className="grow shrink basis-0 text-gray-900 text-xs font-bold font-['Manrope'] leading-[18px] tracking-wide">
                {channel.Config.campaignId}
              </div>
            </div>
          </div>
        );
      default:
        return <p>Has not been set yet</p>;
    }
  };
  const cancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <div className="h-[278px] w-full  flex flex-col items-center justify-between px-2.5 pt-1 pb-2 border rounded-xl bg-white hover:shadow-md hover:rounded-xl transition-shadow">
      <div className="h-10 px-1 py-2 rounded-tl-lg rounded-tr-lg justify-between items-center inline-flex w-full">
        <div className="px-1.5 py-0.5 rounded-xl border border-zinc-500 justify-center items-center gap-2.5 flex">
          <div className="w-[31px] h-3 text-center text-zinc-500 text-[8px] font-bold font-['Inter'] leading-3 tracking-wide">
            Active
          </div>
        </div>
        <div
          onClick={() => handleDelete(channel)}
          className="w-6 h-6 px-[3px] py-[2.62px] justify-center rounded-xl hover:bg-[#f1f2f4] items-center cursor-pointer flex"
        >
          <AiOutlineDelete className="w-full h-full cursor-pointer  " />
        </div>
      </div>
      <div className="relative w-16 h-16 mb-2">
        <Image
          src={iconURL}
          alt={channel.Metadata.type}
          fill
          className="object-contain"
        />
      </div>
      <div className="h-[98px] w-full p-1 flex-col justify-center items-start gap-0.5 inline-flex">
        <div className="self-stretch w-full justify-between items-center inline-flex gap-7 text-wrap">
          <div className="h-[19px] justify-start items-center gap-2 flex">
            <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
            <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
              Name
            </div>
          </div>
          <div className="grow shrink basis-0 text-gray-900 text-xs font-bold font-['Manrope'] leading-tight tracking-tight text-wrap ">
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
            {channel.Metadata.type}
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
            randomDate
          </div>
        </div>
        {channelChange(channel)}
      </div>
      <Dialog open={deleteId !== null} onOpenChange={cancelDelete}>
        <DialogContent className="w-[400px] flex flex-col gap-y-4">
          <DialogHeader>
            <DialogTitle className="mb-2">Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete?{" "}
              <span className="font-bold text-black inline">
                {channel.name} | {channel.Metadata.type}
              </span>{" "}
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={cancelDelete}
              className="hover:bg-slate-200"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="hover:bg-[#c83a3a]"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
