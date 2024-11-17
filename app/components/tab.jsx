import Image from 'next/image';

import {cn} from '../utils'

export default function Tab({ type, src, text }) {
  return (
    <div className={cn("flex items-center cursor-pointer justify-start pl-[10px] gap-[10px] h-[70px] text-[18px] font-bold", text !== 'Messages' ? "gap-[14px]" : 'gap-[10px]')}>
      {/* <img
            src="/assets/icons/newMessage.svg" // Path from the public folder
            alt="messages"
            className="h-[30px] w-[30px]"
          /> */}
      <div className="flex items-center justify-center h-full">
        <Image src={src} className={cn(text == 'Messages' ? 'mb-[-10px]' : 'mb-[0] ml-[6px]')} alt="messages icon" width={ text == "Messages" ? 35 : 25} height={ text == "Messages" ? 35 : 25} />
      </div>    
      <div>{text}</div>
    </div>
  )
}