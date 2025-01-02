import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, getFallBack } from '@/lib/utils';
import { ConversationsListProps } from '@/types/mentor';
import { StaticImageData } from 'next/image';
import facebook from "@/public/facebook.png"
import negarit from "@/public/negarit.png"
import telegram from "@/public/telegram.png"
import twilio from "@/public/Twilio.png"
import whatsApp from "@/public/Whatsapp.png"

const ConversationsList = ({ conversations, currentConversation, setCurrentConversation }: ConversationsListProps) => {
  const platformIcons: Record<string, string> = {
    Telegram: "@/public/facebook.png",
    Negarit: "@/public/negarit.png",
    Twilio: "@/public/Twilio.png",
    Facebook: "@/public/facebook.png",
    WhatsApp: "@/public/Whatsapp.png",
  };

  return (
    <div className="w-80 overflow-y-auto bg-white rounded-[10px] py-4 shadow-sidebar">
      <Command className="px-0">
        {/* the user search box */}
        <CommandInput
          placeholder="Search for a Message"
          className="border-[1px] border-zinc-200 px-2 mx-2 py-1 box-border "
        />

        {/* a list of the users */}
        <ScrollArea>
          <CommandList className="py-1 h-full bg-white max-h-none overflow-y-auto">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="p-3 flex flex-col">
              {/* a an individual user */}
              {conversations.map((conversation) => (
                <CommandItem
                  key={conversation.id}
                  className={cn(
                    'flex px-2.5 gap-3.5 items-center h-[70px] outline-none rounded-lg cursor-pointer',
                    conversation.id === currentConversation.id ? '!bg-gray-300' : 'bg-white'
                  )} // if user is selected sets the background to gry
                  onSelect={() => setCurrentConversation(conversation)} // sets the chosen user to the index of the selected item
                >
                  {/* Avatar image a user */}
                  <Avatar className="w-[32px] h-[32px]">
                    <AvatarImage
                      // src={conversation.platform === "Facebook" ? facebook : conversation.platform === "Negarit" ? negarit : conversation.platform === "Twilio" ? twilio : conversation.platform === "WhatsApp" ? whatsApp : conversation.platform === "telegram" ? telegram : "" }
                      src={platformIcons[conversation.platform]}
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback className="w-full h-full flex items-center justify-center text-base">
                      {getFallBack(conversation.platform)}
                    </AvatarFallback>
                  </Avatar>

                  {/* user information */}
                  <div className="flex flex-col justify-center">
                    <div className="font-bold text-base">{conversation.id}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </ScrollArea>
      </Command>
    </div>
  );
};

export default ConversationsList;
