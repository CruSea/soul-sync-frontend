import * as z from 'zod';

export type ChannelType =
  | 'Telegram Bot'
  | 'WhatsApp'
  | 'Negarit'
  | 'Facebook'
  | 'Twilio';

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  apiKey: string;
  icon: string;
  Date: string;
  isDeleted: boolean;
}

export const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Channel name must be at least 2 characters.',
  }),
  type: z.enum(['Telegram Bot', 'WhatsApp', 'Negarit', 'Facebook', 'Twilio']),
  apiKey: z.string().min(1, {
    message: 'API Key is required.',
  }),
});

export type formSchemaType = z.infer<typeof formSchema>;
