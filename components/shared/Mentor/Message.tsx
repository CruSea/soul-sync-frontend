import Image from "next/image";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/mentor";

interface MessageProps {
  text: string;
  isUser: boolean;
  time: string;
  newDay: string;
  currentUser: User;
}

const Message: React.FC<MessageProps> = ({ text, isUser, time, newDay, currentUser }) => {
  return (
    <div
      className={cn(
        " flex gap-2 items-end",
        isUser ? "ml-auto flex-row-reverse" : "flex",
        newDay !== "" ? "pt-6" : ""
      )}
    >
      {/* if it is a user the account icon will be on the right side instead of left.
          if it is the first message of the day, give a padding for the Date text.
          if it is the first message of the day and the first message of the message thread give an extra padding for the text at top 
      
      */}
      {newDay !== "" && (
        <div className="absolute z-40 top-1 left-1/2 transform translate-x-[-50%] font-normal text-xs text-neutral-400">
          {newDay}
        </div>
      )}

      {/*dummy avatar man for the user and woman for the mentor*/}
      <Avatar className="w-[50px] h-[50px]">
        <AvatarImage
          src={isUser ? currentUser.imageUrl : "/assets/avatars/woman1.png"}
          className="w-full h-full object-cover"
        />
        <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
          JD
        </AvatarFallback>
      </Avatar>

      {/* chat text*/}
      <div className="relative">
        <div className="bg-neutral-200 text-sm font-normal p-2.5 rounded-xl max-w-[420px]">
          {text}
        </div>

        <div
          className={cn(
            "absolute bottom-[-15px] min-w-[45px] font-normal text-[9px] text-neutral-400",
            isUser ? "right-[7px]" : "left-[14px]"
          )}
        >
          {/* make the time text directly under the text */}
          {time}
        </div>
      </div>
    </div>
  );
};

export default Message;
