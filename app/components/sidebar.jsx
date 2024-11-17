import Image from 'next/image';
import Tab from './tab';
import messagesIcon from '../assets/icons/messages.png';
import settingsIcon from '../assets/icons/settings.png';
import helpIcon from '../assets/icons/help.png';

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-[25px] w-[267px] px-[10px] py-[20px] h-screen border-r border-[#D9D9D9] ">
      <div className="relative h-[80px] font-bold text-[36px] tracking-[8px] w-full flex items-center justify-center">
        <div className="w-full text-center">
          TURUMBA
        </div>
        <div class="absolute bottom-0 left-0 right-0 border-b shadow-[0px_1px_4px_0px_rgba(0,0,0,0.5)]"></div>
      </div>
      <div className="flex flex-col">
        <Tab src={messagesIcon} text='Messages'/>
        <Tab src={settingsIcon} text='Settings'/>
        <Tab src={helpIcon} text='Help & Support'/>
      </div>
    </div>
  );
}
