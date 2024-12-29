import * as z from "zod";

export type ChannelType =
  | "Telegram Bot"
  | "WhatsApp"
  | "Negarit SMS"
  | "Facebook"
  | "Twilio";

export interface Channel {
  id: string;
  name: string;
  Metadata: {
    type: ChannelType;
  };
  Config: {
    token: string;
    apiKey: string;
    campaignId: string;
  };
  Date: string;
  // icon: string;
}

export const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Channel name must be at least 2 characters.",
    }),
    type: z.enum([
      "Telegram Bot",
      "WhatsApp",
      "Negarit SMS",
      "Facebook",
      "Twilio",
    ]),
    apiKey: z.string().optional(),
    token: z.string().optional(),
    campaignId: z.string().optional(),
  })
  .superRefine((channel, ctx) => {
    if (channel.type === "Telegram Bot" && !channel.apiKey) {
      ctx.addIssue({
        code: "custom",
        path: ["apiKey"],
        message: "API Key is required for Telegram Bot.",
      });
    }

    if (channel.type === "Negarit SMS") {
      if (!channel.token) {
        ctx.addIssue({
          code: "custom",
          path: ["token"],
          message: "Token is required for Negarit SMS.",
        });
      }
      if (!channel.campaignId) {
        ctx.addIssue({
          code: "custom",
          path: ["campaignId"],
          message: "Campaign ID is required for Negarit SMS.",
        });
      }
    }
  });

export type formSchemaType = z.infer<typeof formSchema>;
