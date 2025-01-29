'use client';

import { useEffect, useState } from 'react';
import { AddChannelDialog } from '@/components/shared/Channel/add-channel-dialog';
import { ChannelCard } from '@/components/shared/Channel/channel-card';
import type { Channel } from '@/types/channel';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { channelJsonserver } from '@/data/end-points';
import { fetchedChannels, handleAddChannel } from '@/actions/admin/channel';
import { v4 as uuidv4 } from 'uuid';

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
    const getChannels = async () => {
      const response = await fetchedChannels();
      if (response.responseData) {
        setChannels(response.responseData);
      } else {
        toast(response.error);
      }
    };
    getChannels();
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

  const AddChannel = (
    newChannel: Omit<Channel, 'id' | 'icon' | 'createdAt' | 'accountId'>
  ) => {
    const channelWithId: Channel = {
      ...newChannel,
      id: `${uuidv4().toString()}`,
      createdAt: new Date().toLocaleDateString('en-US', format),
      accountId: '4211a09b-b42a-4b1d-85f9-a6598d8ff585',
    };
    setChannels(channels ? [...channels, channelWithId] : [channelWithId]);
    handleAddChannel(channelWithId);

    toast({
      title: 'Channel added successfully',
      description: 'The channel has been added to the list',
      duration: 3000,
    });
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
                    onAddChannel={AddChannel}
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
