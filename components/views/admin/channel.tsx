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
import Pagination from '@/components/shared/pagination';

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
  const [itemsPerPage, onItemsPerPageChange] = useState<number>(6);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const page = currentPage;

  useEffect(() => {
    const fetchUserAccount = async () => {
      const userAccount: Account = await userProfile();
      setUser(userAccount);
    };
    fetchUserAccount();
  }, []);

  useEffect(() => {
    const loadChannels = async () => {
      if (!user?.id) return;
      const response = await fetchedChannels(user.id, itemsPerPage, page);

      if (response.error) {
        toast(response.error);
      } else {
        setChannels(response.data);
        setTotalPages(response.meta.totalPages);
      }
    };
    loadChannels();
  }, [user?.id, triggerState, itemsPerPage, page, toast]);

  const filteredChannel = channels?.filter(
    (item) =>
      (selectedCategory === 'All' || item.type === selectedCategory) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addChannel = async (
    newChannel: Omit<Channel, 'id' | 'icon' | 'createdAt' | 'accountId'>
  ) => {
    if (user) {
      const channelToAdd = { ...newChannel, accountId: user.id } as Channel;
      const response = await handleAddChannel(channelToAdd);
      if (response.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: response.error.discription,
          duration: 3000,
        });
      } else {
        setTriggerState(!triggerState);
        toast({
          variant: 'success',
          title: 'Success',
          description: `Channel ${channelToAdd.name} added successfully`,
          duration: 3000,
        });
        await revalidate('add-channel');
      }
    }
  };

  return (
    <div className="h-fit min-h-screen w-full mx-auto p-2 sm:p-10">
      <div className="h-fit min-h-screen w-full space-y-4 sm:space-y-6 bg-white border p-2 sm:p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 px-2 sm:px-3 pt-2 sm:pt-3 gap-2">
          <h1 className="text-lg sm:text-2xl font-bold">List of Channels</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {channels?.length} channels added
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-background p-2 sm:p-4">
          <Command className="w-full max-w-full h-full flex flex-col">
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center p-1 border-b pb-4 sm:pb-6">
              <CommandInput
                placeholder="Search..."
                value={search}
                onValueChange={setSearch}
                className="flex-grow border px-3 py-2 w-full text-sm"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
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
            <CommandList className="flex-grow h-full">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-5 gap-3 sm:gap-4 p-2 sm:p-4 h-full">
                  {filteredChannel.length > 0 &&
                    filteredChannel?.map((channel, index) => (
                      <CommandItem
                        key={channel.id || `channel-${index}`}
                        className="w-full items-center justify-center h-full min-h-[100px] rounded-xl"
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
                    onAddChannel={addChannel}
                    setSelectedChannel={setSelectedChannel}
                    selectedChannel={selectedChannel}
                  />
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <div className="w-full flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
}
