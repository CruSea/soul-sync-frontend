export type ChannelType =
  | "Telegram Bot"
  | "WhatsApp"
  | "Negarit"
  | "Facebook"
  | "Twilio";

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  apiKey: string;
  webhookUrl: string;
  customGreeting: string;
  icon: string;
}
