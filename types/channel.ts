import * as z from 'zod';

export type ChannelType =
  | 'Telegram Bot'
  | 'WhatsApp'
  | 'Negarit SMS'
  | 'Facebook'
  | 'Twilio';

export interface Channel {
  id: string;
  name: string;
  channelType: ChannelType;
  channelConfig: telegramConfig | NegaritConfig;
  date: string;
}
export type telegramConfig = {
  channelToken: string;
};

export type NegaritConfig = {
  apiKey: string;
  campaignId: string;
};

export const formSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Channel name must be at least 2 characters.',
    }),
    channelType: z.enum([
      'Telegram Bot',
      'WhatsApp',
      'Negarit SMS',
      'Facebook',
      'Twilio',
    ]),
    apiKey: z.string().optional(),
    channelToken: z.string().optional(),
    campaignId: z.string().optional(),
  })
  .superRefine((channel, ctx) => {
    if (channel.channelType === 'Telegram Bot' && !channel.channelToken) {
      ctx.addIssue({
        code: 'custom',
        path: ['channelToken'], // Fixed path to match the schema
        message: 'Channel token is required for Telegram Bot.',
      });
    }

    if (channel.channelType === 'Negarit SMS') {
      if (!channel.apiKey) {
        ctx.addIssue({
          code: 'custom',
          path: ['apiKey'],
          message: 'API key is required for Negarit SMS.',
        });
      }
      if (!channel.campaignId) {
        ctx.addIssue({
          code: 'custom',
          path: ['campaignId'],
          message: 'Campaign ID is required for Negarit SMS.',
        });
      }
    }
  });

export type formSchemaType = z.infer<typeof formSchema>;
