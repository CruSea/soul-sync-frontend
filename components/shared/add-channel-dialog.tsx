'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React from 'react';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import type { Channel, type } from '@/types/channel';
import { useToast } from '@/hooks/use-toast';
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Channel name must be at least 2 characters.',
  }),
  type: z.enum(['TELEGRAM', 'WHATSAPP', 'NEGARIT', 'FACEBOOK', 'TWILIO']),
  api_key: z.string().min(1, {
    message: 'API Key is required.',
  }),
  webhookUrl: z.string().url({
    message: 'Please enter a valid URL.',
  }),
  customGreeting: z.string(),
});

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
      type: 'TELEGRAM',
      api_key: '',
      webhookUrl: '',
      customGreeting: 'Welcome to our support bot!',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const date = new Date().toLocaleDateString('en-US', format);
    onAddChannel({
      ...values,
      date: date,
      isDeleted: false,
      type: values.type.toUpperCase() as type,
    });

    setOpen(false);
    form.reset();
  }

  const { toast } = useToast();

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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Pedro Duarte" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a channel type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Telegram">Telegram Bot</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Negarit">Negarit</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Twilio">Twilio</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="api_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Aef35jhjsf48Hfe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="webhookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webhook URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/telegram/webhook"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customGreeting"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Greeting Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Welcome to our support bot!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              onClick={() => {
                toast({
                  title: 'Channel added successfully',
                  description: 'Your channel has been added successfully',
                });
              }}
            >
              Add channel
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
