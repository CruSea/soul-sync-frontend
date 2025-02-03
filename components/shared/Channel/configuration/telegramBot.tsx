import type { Channel, telegramConfig } from '@/types/channel';

type telegramProp = {
  channel: Channel;
};

function telegramBot({ channel }: telegramProp) {
  const config = channel.configuration as telegramConfig;
  return (
    <div className="w-full justify-between items-center flex ">
      <div className="h-auto w-fit gap-2 items-center flex  justify-between">
        <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
        <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
          Token
        </div>
      </div>
      <div className="text-gray-900 text-xs font-bold  p-1 [overflow-wrap:anywhere]">
        {config.token}
      </div>
    </div>
  );
}

export default telegramBot;
