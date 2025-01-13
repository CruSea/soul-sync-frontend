import Image from 'next/image';
import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageProps } from '@/types/mentor';
import React from 'react';

const Message: React.FC<MessageProps> = ({ text, isMentor, time, newDay }) => {
  return (
    <div
      className={cn(
        ' flex gap-2 items-end',
        isMentor ? 'ml-auto flex-row-reverse' : 'flex',
        newDay !== '' ? 'pt-6' : ''
      )}
    >
      {/* if it is a user the account icon will be on the right side instead of left.
          if it is the first message of the day, give a padding for the Date text.
          if it is the first message of the day and the first message of the message thread give an extra padding for the text at top 
      
      */}
      {newDay !== '' && (
        <div className="absolute z-40 top-1 left-1/2 transform translate-x-[-50%] font-normal text-xs text-neutral-400">
          {newDay}
        </div>
      )}

      {/*dummy avatar man for the user and woman for the mentor*/}
      {/* <Avatar className="w-[50px] h-[50px]">
        <AvatarImage src={imageUrl} className="w-full h-full object-cover" />
        <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
          JD
        </AvatarFallback>
      </Avatar> */}

      {/* chat text*/}
      <div className="relative">
        <div className="bg-neutral-200 text-sm font-normal p-2.5 rounded-xl max-w-[420px]">
          {text}
        </div>

        <div
          className={cn(
            'absolute bottom-[-15px] min-w-[45px] font-normal text-[9px] text-neutral-400',
            isMentor ? 'right-[7px]' : 'left-[14px]'
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
