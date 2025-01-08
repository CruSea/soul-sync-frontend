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
import TypeForm from './channel-type-form';
import ChannelApiForm from './channel-api-form';
import Tokenform from './channel-token-form';
import ChannelCampIdform from './channel-campId-form';
import { Form } from '@/components/ui/form';

interface AddChannelDialogProps {
  onAddChannel: (
    channel: Omit<Channel, 'id' | 'date' | 'accountId' | 'createdAt'>
  ) => void;
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
      type: 'TELEGRAM',
      api_key: '',
      token: '',
      campaign_id: '',
    },
  });
  const watchedValues = form.watch();
  const previousWatchedValues = useRef(watchedValues); // Keep track of previous values

  const [currentChannel, setCurrentChannel] = useState<
    Omit<Channel, 'id' | 'date' | 'accountId' | 'createdAt'>
  >({
    name: '',
    type: 'TELEGRAM',
    configuration: {
      token: '',
    },
  });

  useEffect(() => {
    // Compare current and previous watched values
    if (
      JSON.stringify(watchedValues) !==
      JSON.stringify(previousWatchedValues.current)
    ) {
      if (watchedValues.type == 'TELEGRAM') {
        const transformedData = {
          name: watchedValues.name || '',
          type: watchedValues.type || '',
          configuration: {
            token: watchedValues.token || '',
          },
        };
        setCurrentChannel(transformedData);
      } else if (watchedValues.type == 'NEGARIT') {
        const transformedData = {
          name: watchedValues.name || '',
          type: watchedValues.type || '',
          configuration: {
            api_key: watchedValues.api_key || '',
            campaign_id: watchedValues.campaign_id || '',
          },
        };
        setCurrentChannel(transformedData);
      }
      previousWatchedValues.current = watchedValues; // Update ref with the new values
    }
  }, [watchedValues]);

  console.log('Current Channel State:', currentChannel);

  const channelChange = () => {
    switch (selectedChannel) {
      case 'TELEGRAM':
        return <Tokenform form={form} />;
      case 'NEGARIT':
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
    onAddChannel(currentChannel);
    setSelectedChannel('TELEGRAM');
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
            <TypeForm form={form} setSelectedChannel={setSelectedChannel} />
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
