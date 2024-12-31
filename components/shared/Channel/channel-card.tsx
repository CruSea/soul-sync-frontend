import React from 'react';

import Image from 'next/image';
import type { Channel } from '@/types/channel';
import { AiOutlineDelete } from 'react-icons/ai';
import TelegramBot from './ChannelConfig/telegramBot';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import NegaritSMS from './ChannelConfig/NegaritSMS';

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
  let iconURL = '';
  switch (channel.metaData.channelType) {
    case 'Telegram Bot':
      iconURL = '/telegram.png';
      break;
    case 'Negarit SMS':
      iconURL = '/negarit.png';
      break;
    case 'WhatsApp':
      iconURL = '/Whatsapp.png';
      break;
    case 'Facebook':
      iconURL = '/Facebook.svg';
      break;
    case 'Twilio':
      iconURL = '/Twilio.png';
      break;
    default:
      iconURL = '';
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
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Deleted channel:', data);
          // Show toast notification after successful deletion
          toast({
            title: 'Channel deleted successfully',
            description: 'The channel has been deleted from the list',
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error('Error:', error);
          toast({
            title: 'Error deleting channel',
            description: 'An error occurred while deleting the channel.',
            duration: 3000,
          });
        });

      setDeleteId(null);
    }
  };
  const channelChange = (channel: Channel) => {
    switch (channel.metaData.channelType) {
      case 'Telegram Bot':
        return <TelegramBot channel={channel} />;
      case 'Negarit SMS':
        return <NegaritSMS channel={channel} />;
      default:
        return <div>Has not been set yet</div>;
    }
  };
  const cancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <div className="h-full w-full  gap-4  pb-5 flex flex-col items-center justify-between px-2.5 pt-1 border rounded-xl bg-white hover:shadow-md hover:rounded-xl transition-shadow ">
      <div className="h-auto px-1 py-2 rounded-tl-lg rounded-tr-lg justify-between items-center inline-flex w-full">
        <div className="px-1.5 py-0.5 rounded-xl border border-zinc-500 justify-center items-center gap-2.5 flex">
          <div className="w-auto h-3 text-center text-zinc-500 text-[8px] font-bold font-['Inter'] leading-3 tracking-wide">
            Active
          </div>
        </div>
        <div
          onClick={() => handleDelete(channel)}
          className="w-8 h-8 px-[3px] py-[2.62px] justify-center rounded-xl hover:bg-[#f1f2f4] items-center cursor-pointer flex"
        >
          <AiOutlineDelete className="w-8 h-8 cursor-pointer" />
        </div>
      </div>
      <div className="w-auto mb-2 h-auto">
        <Image
          src={iconURL}
          alt={channel.metaData.channelType}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
      <div className="h-full w-full  flex-col justify-start items-start  inline-flex ">
        <div className="w-full h-auto justify-between items-center flex text-wrap gap-2">
          <div className="h-auto justify-between items-center gap-2 flex">
            <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
            <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
              Name
            </div>
          </div>
          <div className="text-gray-900 text-xs font-bold font-['Manrope'] ">
            {channel.name}
          </div>
        </div>
        <div className="w-full h-auto justify-between items-center flex text-wrap">
          <div className="h-auto justify-between items-center gap-2 flex">
            <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
            <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
              Type
            </div>
          </div>
          <div className="text-gray-900 text-xs font-bold font-['Manrope'] ">
            {channel.metaData.channelType}
          </div>
        </div>
        <div className="w-full h-auto justify-between items-center flex text-wrap ">
          <div className="h-auto justify-between items-center gap-2 flex">
            <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
            <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
              Date
            </div>
          </div>
          <div className="text-gray-900 text-xs font-bold font-['Manrope'] ">
            {channel.date}
          </div>
        </div>
        {channelChange(channel)}
      </div>
      <Dialog open={deleteId !== null} onOpenChange={cancelDelete}>
        <DialogContent className="w-[400px] flex flex-col gap-y-4">
          <DialogHeader>
            <DialogTitle className="mb-2">Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete?{' '}
              <span className="font-bold text-black inline">
                {channel.name} | {channel.metaData.channelType}
              </span>{' '}
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
