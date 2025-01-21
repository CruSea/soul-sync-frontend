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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type typeFormProps = {
  form: UseFormReturn<formSchemaType>;
  setSelectedChannel: React.Dispatch<React.SetStateAction<string>>;
};

export default function ChannelNameForm({
  form,
  setSelectedChannel,
}: typeFormProps) {
  return (
    <div>
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Channel Type</FormLabel>
            <Select
              onValueChange={(value) => {
                // Update the channel type
                field.onChange(value);
                setSelectedChannel(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a channel type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="TELEGRAM">TELEGRAM</SelectItem>
                <SelectItem value="WHATSAPP">WHATSAPP</SelectItem>
                <SelectItem value="NEGARIT">NEGARIT</SelectItem>
                <SelectItem value="FACEBOOK">FACEBOOK</SelectItem>
                <SelectItem value="TWILIO">TWILIO</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
