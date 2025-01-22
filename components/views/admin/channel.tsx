'use client';

import { useEffect, useState } from 'react';
import { AddChannelDialog } from '@/components/shared/Channel/add-channel-dialog';
import { ChannelCard } from '@/components/shared/Channel/channel-card';
import type { Channel } from '@/types/channel';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { channelJsonserver, endPoints } from '@/data/end-points';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toast } = useToast();
  const [selectedChannel, setSelectedChannel] = useState<string>('TELEGRAM');
  const categories = [
    'All',
    'TELEGRAM',
    'WHATSAPP',
    'NEGARIT',
    'FACEBOOK',
    'TWILIO',
  ];

  useEffect(() => {
    const fetchedChannels = async () => {
      // backend call
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (user) {
        const endpoint = `${BASE_URL}/${endPoints.channel}`;

        const userObj = JSON.parse(user);

        const requestBody = {
          accountId: userObj.accounts[0].id,
        };

        const response = await fetch(
          `${endpoint}?accountId=${requestBody.accountId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token ? `Bearer ${JSON.parse(token)}` : '',
            },
          }
        );
        const data = await response.json();
        console.log('fetched', data);
        setChannels(data);
      } else {
        console.log('cant fetch');
      }
    };
    fetchedChannels();
  }, []);

  const filteredChannel = channels?.filter(
    (item) =>
      (selectedCategory === 'All' || item.type === selectedCategory) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );
  const format: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const handleAddChannel = (
    newChannel: Omit<Channel, 'id' | 'icon' | 'createdAt' | 'accountId'>
  ) => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      const endpoint = `${BASE_URL}/${endPoints.channel}`;
      const userObj = JSON.parse(user);
      const requestBody = {
        accountId: userObj.accounts[0].id,
      };
      const channelWithId = {
        ...newChannel,
        accountId: requestBody.accountId,
      } as Channel;
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${JSON.parse(token)}` : '',
        },
        body: JSON.stringify(channelWithId),
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`Failed to add channel: ${response.status}`);
          }
          const newChannel = await response.json(); // Get the server's response
          setChannels((channels) =>
            channels ? [...channels, newChannel] : [newChannel]
          ); // Add new channel to state
          toast({
            title: 'Channel added successfully',
            description: 'The channel has been added to the list',
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error('Error adding channel:', error);
          toast({
            title: 'Error adding channel',
            description:
              'There was an error adding the channel. Please try again.',
            duration: 3000,
          });
        });
    } else {
      toast({
        title: 'Error Finding the user',
        description:
          'There was an error while fetching a user. Please try again.',
        duration: 3000,
      });
    }
  };

  return (
    <div className="h-fit min-h-screen w-full mx-auto p-10  ">
      <div className="h-fit min-h-screen w-full space-y-6  bg-white border p-6 rounded-lg ">
        <div className="flex items-center justify-between mb-6 px-3 pt-3">
          <h1 className="text-2xl font-bold">List of Channels</h1>
          <p className="text-sm text-muted-foreground">
            {channels?.length} channels added
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
                <div className="grid lg:grid-cols-4 3xl:grid-cols-5 md:grid-cols-3 grid-cols-[repeat(auto-fit,minmax(min-content,1fr))] gap-4 p-4 h-full">
                  {filteredChannel?.map((channel, index) => (
                    <CommandItem
                      key={channel.id || `channel-${index}`}
                      className="w-auto items-center justify-center h-full min-h-[100px] rounded-xl"
                    >
                      <ChannelCard
                        channel={channel}
                        setChannels={setChannels}
                        toast={toast}
                      />
                    </CommandItem>
                  ))}
                  <AddChannelDialog
                    onAddChannel={handleAddChannel}
                    setSelectedChannel={setSelectedChannel}
                    selectedChannel={selectedChannel}
                  />
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  );
}
