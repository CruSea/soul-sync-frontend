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
        name="campaign_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>campaign Id</FormLabel>
            <FormControl>
              <Input placeholder="Please Insert the Campaign Id" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
