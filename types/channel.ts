import * as z from 'zod';

export type type = 'TELEGRAM' | 'WHATSAPP' | 'NEGARIT' | 'FACEBOOK' | 'TWILIO';

export type connectionRequest = {
  id: string;
  request: { ok: boolean; result: boolean; description: string };
};

export interface Channel {
  id: string;
  name: string;
  type: type;
  configuration: telegramConfig | NegaritConfig;
  is_on?: boolean;
  createdAt: string;
  accountId: string;
}
export type telegramConfig = {
  token: string;
};

export type NegaritConfig = {
  api_key: string;
  campaign_id: string;
};

export const formSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Channel name must be at least 2 characters.',
    }),
    type: z.enum(['TELEGRAM', 'WHATSAPP', 'NEGARIT', 'FACEBOOK', 'TWILIO']),
    api_key: z.string().optional(),
    token: z.string().optional(),
    campaign_id: z.string().optional(),
  })
  .superRefine((channel, ctx) => {
    if (channel.type === 'TELEGRAM' && !channel.token) {
      ctx.addIssue({
        code: 'custom',
        path: ['token'], // Fixed path to match the schema
        message: 'Channel token is required for Telegram.',
      });
    }

    if (channel.type === 'NEGARIT') {
      if (!channel.api_key) {
        ctx.addIssue({
          code: 'custom',
          path: ['api_key'],
          message: 'API key is required for Negarit.',
        });
      }
      if (!channel.campaign_id) {
        ctx.addIssue({
          code: 'custom',
          path: ['campaign_id'],
          message: 'Campaign ID is required for Negarit.',
        });
      }
    }
  });

export type formSchemaType = z.infer<typeof formSchema>;
