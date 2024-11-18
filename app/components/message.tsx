import Image from "next/image";
import { cn } from '../utils'

interface MessageProps {
  text: string
  isUser: boolean
  time: string
  newDay: string
  index: number
}

const Message: React.FC<MessageProps> = ({ text, isUser, time, newDay, index }) => {
  return (
    <div className={cn("relative flex gap-2 items-end", !isUser ? "ml-auto flex-row-reverse" : "flex", newDay !== "" ? "pt-6" : '')}>
      {/* if it is a user the account icon will be on the right side instead of left.
          if it is the first message of the day, give a padding for the Date text.
          if it is the first message of the day and the first message of the message thread give an extra padding for the text at top 
      
      */}
      {newDay !== "" && <div className='absolute z-40 top-[-3px] left-1/2 transform translate-x-[-50%] font-normal text-xs text-neutral-400'>
        {newDay}
      </div>}
      <Image
        src="/assets/chatProfile.png"
        alt="user image"
        layout="fixed"
        width={100}
        height={100}
        className="w-[35px] h-[35px] border-black rounded-full"
      />
      <div className="bg-neutral-200 text-sm font-normal p-2.5 rounded-xl max-w-[420px]">
        {text}
      </div>
      <div className={cn("absolute bottom-[-15px] min-w-[45px] font-normal text-[9px] text-neutral-400", isUser ? "left-[53px]" : "right-[53px]")}>
        {/* make the time text directly under the text */}
        {time}
      </div>
    </div>
  )
}

export default Message;