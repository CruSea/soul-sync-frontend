import type { Channel, NegaritConfig } from '@/types/channel';
type NegaritProp = {
  channel: Channel;
};

function Negarit({ channel }: NegaritProp) {
  const config = channel.configuration as NegaritConfig;

  return (
    <div className="w-full">
      <div className="w-full justify-between items-center flex ">
        <div className="h-auto w-fit gap-2 items-center flex  justify-between">
          <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
          <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
            Api Key
          </div>
        </div>
        <div className="text-gray-900 text-xs font-bold font-['Manrope'] ">
          {config.api_key}
        </div>
      </div>
      <div className="justify-between items-center flex  w-full ">
        <div className="h-auto justify-start items-center gap-2 flex">
          <div className="w-2.5 h-2.5 bg-[#27a376] rounded-[50px]" />
          <div className="text-[#677488] text-xs font-medium font-['Manrope'] leading-tight">
            Campaign ID
          </div>
        </div>
        <div className="text-gray-900 text-xs font-bold font-['Manrope']">
          {config.campaign_id}
        </div>
      </div>
    </div>
  );
}

export default Negarit;
