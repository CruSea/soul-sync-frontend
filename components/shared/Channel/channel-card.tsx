import React from 'react';

import Image from 'next/image';
import type { Channel } from '@/types/channel';
import { AiOutlineDelete } from 'react-icons/ai';
import TelegramBot from './configuration/telegramBot';
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
import NegaritSMS from './configuration/NegaritSMS';
import { endPoints } from '@/data/end-points';
import { connectionRequest } from '@/types/channel';

interface ChannelCardProps {
  channel: Channel;
  setChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
  toast: (props: {
    title: string;
    description: string;
    duration?: number;
  }) => void;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
export function ChannelCard({ channel, setChannels, toast }: ChannelCardProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [requests, setRequests] = useState<connectionRequest>();
  const [connectedId, setConnectedId] = useState<string | null>(null);
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

  // backend call
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  if (!user) {
    return;
  }
  const endpoint = `${BASE_URL}/${endPoints.channel}`;
  const userObj = JSON.parse(user);

  const requestBody = {
    accountId: userObj.accounts[0].id,
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setChannels((prevItems) =>
        prevItems.filter((item) => item.id !== deleteId)
      );
      fetch(`${endpoint}/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${JSON.parse(token)}` : '',
        },
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

  const handleToggle = (channel: Channel) => {
    if (channel.id) {
      setConnectedId(channel.id);
    }
    if (connectedId !== null) {
      fetch(`${endpoint}/${connectedId}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${JSON.parse(token)}` : '',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('connectedChannel:', data);
          setRequests({
            id: channel.id,
            request: {
              ok: data.ok,
              result: data.result,
              description: data.description,
            },
          });
          toast({
            title: `Channel Connected successfully`,
            description: `The channel  ${channel.name} has been connected successfully`,
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error('Error:', error);
          toast({
            title: 'Error Connecting channel',
            description: `An error occurred while Connecting the channel ${channel.name}.`,
            duration: 3000,
          });
        });
    }
  };

  const check = true; //temporary
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
          alt={channel.type}
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
            {formatDate(channel.createdAt)}
          </div>
        </div>
        {channelChange(channel)}
        <div className="w-full">
          <div className="flex items-center justify-between space-x-2 w-full ">
            <Switch
              id="connect"
              checked={true}
              onCheckedChange={() => handleToggle(channel)}
            />
            <Label htmlFor="connect">
              {check ? 'Connected' : 'Not Connected'}
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
