import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formSchemaType } from '@/types/channel';
import { Input } from '@/components/ui/input';

type ChannelNameFormProps = {
  form: UseFormReturn<formSchemaType>;
};

export default function ChannelNameForm({ form }: ChannelNameFormProps) {
  return (
    <div>
      <FormField
        control={form.control}
        name="apiKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>API Key</FormLabel>
            <FormControl>
              <Input placeholder="Please Insert the API Key" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
