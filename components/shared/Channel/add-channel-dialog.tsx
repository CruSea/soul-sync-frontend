'use client';

import { useState } from 'react';
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
import type { Channel } from '@/types/channel';
import ChannelNameForm from './channel-name-form';
import { formSchema } from '@/types/channel';
import ChannelTypeForm from './channel-type-form';
import ChannelConfigForm from './channel-config-form';
import { Form } from '@/components/ui/form';

interface AddChannelDialogProps {
  onAddChannel: (channel: Omit<Channel, 'id' | 'icon'>) => void;
}

export function AddChannelDialog({ onAddChannel }: AddChannelDialogProps) {
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
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const date = new Date().toLocaleDateString('en-US', format);
    onAddChannel({
      ...values,
      Date: date,
      isDeleted: false,
    });
    setOpen(false);
    form.reset();
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
            <ChannelTypeForm form={form} />
            <ChannelConfigForm form={form} />
            <Button type="submit" className="w-full">
              Add channel
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
