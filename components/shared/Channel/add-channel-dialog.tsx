'use client';

import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Channel, formSchemaType } from '@/types/channel';
import ChannelNameForm from './channel-name-form';
import { formSchema } from '@/types/channel';
import ChannelTypeForm from './channel-type-form';
import ChannelApiForm from './channel-api-form';
import ChannelTokenform from './channel-token-form';
import ChannelCampIdform from './channel-campId-form';
import { Form } from '@/components/ui/form';

interface AddChannelDialogProps {
  onAddChannel: (channel: Omit<Channel, 'id' | 'date'>) => void;
  selectedChannel: string;
  setSelectedChannel: React.Dispatch<React.SetStateAction<string>>;
}
export function AddChannelDialog({
  onAddChannel,
  selectedChannel,
  setSelectedChannel,
}: AddChannelDialogProps) {
  const [open, setOpen] = useState(false);
  const format: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'Telegram Bot',
      apiKey: '',
      token: '',
      campaignId: '',
    },
  });
  const watchedValues = form.watch();
  const previousWatchedValues = useRef(watchedValues); // Keep track of previous values

  const [currentChannel, setCurrentChannel] = useState<
    Omit<Channel, 'id' | 'date'>
  >({
    name: '',
    channelType: 'Telegram Bot',
    channelConfig: {
      channelToken: '',
      apiKey: '',
      campaignId: '',
    },
  });

  useEffect(() => {
    // Compare current and previous watched values
    if (
      JSON.stringify(watchedValues) !==
      JSON.stringify(previousWatchedValues.current)
    ) {
      const transformedData = {
        name: watchedValues.name || '',
        channelType: watchedValues.type || '',
        channelConfig: {
          channelToken: watchedValues.token || '',
          apiKey: watchedValues.apiKey || '',
          campaignId: watchedValues.campaignId || '',
        },
      };

      setCurrentChannel(transformedData);
      previousWatchedValues.current = watchedValues; // Update ref with the new values
    }
  }, [watchedValues]);

  console.log('Current Channel State:', currentChannel);

  const channelChange = () => {
    switch (selectedChannel) {
      case 'Telegram Bot':
        return <ChannelTokenform form={form} />;
      case 'Negarit SMS':
        return (
          <div>
            <ChannelApiForm form={form} />
            <ChannelCampIdform form={form} />
          </div>
        );
      default:
        return <p>Has not been set yet</p>;
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const date = new Date().toLocaleDateString('en-US', format);
    if (currentChannel.channelType === 'Negarit SMS') {
      currentChannel.channelConfig.channelToken = '';
      onAddChannel(currentChannel);
    } else if (currentChannel.channelType === 'Telegram Bot') {
      currentChannel.channelConfig.apiKey = '';
      currentChannel.channelConfig.campaignId = '';
      onAddChannel(currentChannel);
    }
    setSelectedChannel('Telegram Bot');
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-[278px] w-full">
          <Plus className="h-8 w-8" />
          <span className="sr-only">Add a Channel</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ChannelNameForm form={form} />
            <ChannelTypeForm
              form={form}
              setSelectedChannel={setSelectedChannel}
            />
            {channelChange()}
            <Button type="submit" className="w-full">
              Add channel
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
