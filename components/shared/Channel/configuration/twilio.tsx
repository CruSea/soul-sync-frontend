import React from 'react';
import type { Channel } from '@/types/channel';

type TwilioProp = {
  channel: Channel;
};
// it will be changed later when the it is scaled for whatsapp now its just a placeholder
function Twilio({ channel }: TwilioProp) {
  return (
    <div>
      <div className="w-full justify-between items-center flex ">
        <div className="h-auto w-fit gap-2 items-center flex  justify-between">
          <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
          <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
            api_key
          </div>
        </div>
        <div className="text-gray-900 text-xs font-bold font-['Manrope'] ">
          {channel.api_key}
        </div>
      </div>
    </div>
  );
}

export default Twilio;
