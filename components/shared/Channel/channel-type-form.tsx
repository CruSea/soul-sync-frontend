import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { formSchemaType } from "@/types/channel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ChannelTypeFormProps = {
  form: UseFormReturn<formSchemaType>;
  setSelectedChannel: React.Dispatch<React.SetStateAction<string>>;
};

export default function ChannelNameForm({
  form,
  setSelectedChannel,
}: ChannelTypeFormProps) {
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
                field.onChange(value); // Updates the form field value
                setSelectedChannel(value); // Updates the external selected channel state
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a channel type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Telegram Bot">Telegram Bot</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Negarit SMS">Negarit</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Twilio">Twilio</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
