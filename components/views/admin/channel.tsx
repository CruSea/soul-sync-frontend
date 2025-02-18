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
import { fetchedChannels, handleAddChannel } from '@/actions/admin/channel';
import { Account } from '@/types/users';
import { userProfile } from '@/actions/auth/login';
import { revalidate } from '@/actions/revalidate';
// import { channel } from 'diagnostics_channel';

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toast } = useToast();
  const [selectedChannel, setSelectedChannel] = useState<string>('TELEGRAM');
  const [triggerState, setTriggerState] = useState<boolean>(true);
  const categories = [
    'All',
    'TELEGRAM',
    'WHATSAPP',
    'NEGARIT',
    'FACEBOOK',
    'TWILIO',
  ];
  const [user, setUser] = useState<Account | null>(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userAccoutId: Account = await userProfile();
      setUser(userAccoutId);
      console.log('user:', userAccoutId);
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const getChannels = async () => {
      console.log('user:', user?.id);

      const response = await fetchedChannels(user?.id as string);
      console.log(response);

      if (!response.error) {
        setChannels(response);
      } else {
        toast(response.error);
      }
    };
    getChannels();
  }, [user?.id, triggerState]);

  const filteredChannel = channels?.filter(
    (item) =>
      (selectedCategory === 'All' || item.type === selectedCategory) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const AddChannel = async (
    newChannel: Omit<Channel, 'id' | 'icon' | 'createdAt' | 'accountId'>
  ) => {
    if (user) {
      const channelWithId = {
        ...newChannel,
        accountId: user.id,
      } as Channel;

      const response = await handleAddChannel(channelWithId);
      if (response.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: response.error.discription,
          duration: 3000,
        });
      }
      setTriggerState(!triggerState);
      toast({
        variant: 'success',
        title: 'Success',
        description: `Channel ${channelWithId.name} added successfully`,
        duration: 3000,
      });
      await revalidate('add-channel');
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
                  {filteredChannel.length > 0 &&
                    filteredChannel?.map((channel, index) => (
                      <CommandItem
                        key={channel.id || `channel-${index}`}
                        className="w-auto items-center justify-center h-full min-h-[100px] rounded-xl"
                      >
                        <ChannelCard
                          channel={channel}
                          setChannels={setChannels}
                          setTriggerState={setTriggerState}
                          triggerState={triggerState}
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
