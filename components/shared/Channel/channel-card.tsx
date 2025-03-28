import React from 'react';

import Image from 'next/image';
import type { Channel } from '@/types/channel';
import { AiOutlineDelete } from 'react-icons/ai';
import TelegramBot from './configuration/telegram-bot';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
import NegaritSMS from './configuration/negarit-sms';
import { useToast } from '@/hooks/use-toast';

// import { endPoints } from '@/data/end-points';
import {
  handleDeleting,
  handleConnect,
  handleDisconnect,
} from '@/actions/admin/channel';

interface ChannelCardProps {
  channel: Channel;
  setChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
  triggerState: boolean;
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
export function ChannelCard({
  channel,
  setChannels,
  setTriggerState,
}: ChannelCardProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [connectedId, setConnectedId] = useState<string | null>(null);
  const [id, setid] = useState<string | null>(null);
  const { toast } = useToast();

  let iconURL = '';
  switch (channel.type) {
    case 'TELEGRAM':
      iconURL = '/telegram.png';
      break;
    case 'NEGARIT':
      iconURL = '/negarit.png';
      break;
    case 'WHATSAPP':
      iconURL = '/Whatsapp.png';
      break;
    case 'FACEBOOK':
      iconURL = '/Facebook.svg';
      break;
    case 'TWILIO':
      iconURL = '/Twilio.png';
      break;
    default:
      iconURL = '';
      break;
  }
  const handleDelete = (channel: Channel) => {
    if (channel.id) {
      setDeleteId(channel.id);
    }
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      setChannels((prevItems) =>
        prevItems.filter((item) => item.id !== deleteId)
      );
    }
    const response = await handleDeleting(deleteId as string);
    if (response.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error.description,
        duration: 3000,
      });
    }
    setTriggerState((prev) => !prev);

    toast({
      variant: 'success',
      title: 'Success',
      description: `Channel ${channel.name} deleted successfully`,
      duration: 3000,
    });

    setDeleteId(null);
  };
  const channelChange = (channel: Channel) => {
    switch (channel.type) {
      case 'TELEGRAM':
        return <TelegramBot channel={channel} />;
      case 'NEGARIT':
        return <NegaritSMS channel={channel} />;
      default:
        return <div>Has not been set yet</div>;
    }
  };
  const cancelDelete = () => {
    setDeleteId(null);
  };

  const handleToggle = (channelId: string) => {
    if (!channelId) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Try again',
        duration: 500,
      });
      return;
    }
  
    setChannels((prevItems) =>
      prevItems.map((item) =>
        item.id === channelId ? { ...item, isOn: !item.isOn } : item
      )
    );
  
    if (!channel.isOn) {
      handleConnect(channelId);
      toast({
        variant: 'success',
        title: 'Success',
        description: `Channel ${channel.name} connected successfully`,
        duration: 3000,
      });
    } else {
      handleDisconnect(channelId);
      toast({
        variant: 'success',
        title: 'Success',
        description: `Channel ${channel.name} disconnected successfully`,
        duration: 3000,
      });
    }
  
    setTriggerState((prev) => !prev);
  };
  
  return (
    <div className="h-full w-full  gap-4  pb-5 flex flex-col items-center justify-between px-2.5 pt-1 border rounded-xl bg-white hover:shadow-md hover:rounded-xl transition-shadow ">
      <div className="h-auto px-1 py-2 rounded-tl-lg rounded-tr-lg justify-between items-center inline-flex w-full">
        <div className="px-1.5 py-0.5 rounded-xl  justify-center items-center gap-2.5 flex"></div>
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
          alt={channel.type as string}
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
            {channel.type}
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
            {/* {channel.createdAt} */}
            {formatDate(channel.createdAt as string)}
          </div>
        </div>
        {channelChange(channel)}
        <div className="w-full">
          <div className="flex items-center justify-between space-x-2 w-full ">
            <Switch
              id="connect"
              checked={channel.isOn}
              onCheckedChange={() => handleToggle(channel.id as string)}
            />
            <Label htmlFor="connect">
              {channel.isOn ? 'Connected' : 'Not Connected'}
            </Label>
          </div>
        </div>
      </div>
      <Dialog open={deleteId !== null} onOpenChange={cancelDelete}>
        <DialogContent className="w-[400px] flex flex-col gap-y-4">
          <DialogHeader>
            <DialogTitle className="mb-2">Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete?{' '}
              <span className="font-bold text-black inline">
                {channel.name} | {channel.type}
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
