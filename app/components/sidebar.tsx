"use client"

import { useState } from 'react';
import {Tab} from './tab';
import Theme from './theme';

import messagesIcon from '../assets/icons/messages.png';
import settingsIcon from '../assets/icons/settings.png';
import helpIcon from '../assets/icons/help.png';
import sun from '../assets/icons/sun.svg';
import moon from '../assets/icons/moon.svg';


export default function Sidebar() {
  const [theme, setTheme] = useState<"Light" | "Dark">('Light');
  const [currentTab, setCurrentTab] = useState<0 | 1 | 2>(0);

  return (
    <div className='px-3 py-5 flex flex-col justify-between w-64 h-screen border-r border-neutral-300'>
      {/* Title Section */}
      <div className="flex flex-col gap-8">
        <div className="relative h-20 font-bold text-4xl tracking-[8px] w-full flex items-center justify-center">
          <div className="w-full text-center">
            TURUMBA
          </div>
          {/* Decorative bottom shadow */}
          <div className="absolute bottom-0 left-0 right-0 border-t shadow-custom-bottom"></div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-col">
          <Tab src={messagesIcon} text='Messages' isChosen={currentTab === 0} chooseTab={() => setCurrentTab(0)}/>
          <Tab src={settingsIcon} text='Settings' isChosen={currentTab === 1} chooseTab={() => setCurrentTab(1)}/>
          <Tab src={helpIcon} text='Help & Support' isChosen={currentTab === 2} chooseTab={() => setCurrentTab(2)}/>
        </div>
      </div>
      <div className='w-full h-[55px] rounded-full bg-[#F8F8F8] px-[6px] py-[6px] flex gap-[6px]'>
        <Theme src={sun} text='Light' isChosen={theme == 'Light'} changeTheme={() => setTheme('Light')}/>
        <Theme src={moon} text='Dark' isChosen={theme == 'Dark'} changeTheme={() => setTheme('Dark')}/>
      </div>
    </div>
  );
}
