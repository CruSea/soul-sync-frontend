"use client"

import { useState, useRef, useEffect } from 'react';
import ChatHeader from './chatHeader'
import ChatCss from '../styles/chat.module.css'
import Message from './message';
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';


// type for the group of message threads between user and mentor
interface threadType {
  isUser: boolean;
  text: string
  time: string
  newDay: string
  id: string
}

const Chat = () => {

  const [thread, setThread] = useState<threadType[]>([
    {
      isUser: true,
      text: "Hi, How are you?",
      time: '2:43 PM',
      newDay: 'November 14, 2024',
      id: uuidv4()
    },
    {
      isUser: false,
      text: "Hi Jennie, I am fine what about you?",
      time: '2:43 PM',
      newDay: '',
      id: uuidv4()
    },
    {
      isUser: true,
      text: "Lorem ipsum odor? todor? huodor hjhkhask aamet, consectetuer adipiscing elit. Sed eros nullam fermentum viverra ante amet justo. Facilisi justo bibendum mus ante augue sem. Malesuada natoque urna ornare primis neque mattis. Dictum volutpat fames tempus taciti pellentesque amet amet primis neque mattis. Dictum volutpat fames tempus taciti.",
      time: '2:44 PM',
      newDay: '',
      id: uuidv4()
    },
    {
      isUser: false,
      text: "Hi Jennie, I am fine what about you?",
      time: '2:43 PM',
      newDay: '',
      id: uuidv4()
    },
    {
      isUser: true,
      text: "Lorem ipsum odor? todor? huodor hjhkhask aamet, consectetuer adipiscing elit. Sed eros nullam fermentum viverra ante amet justo. Facilisi justo bibendum mus ante augue sem. Malesuada natoque urna ornare primis neque mattis. Dictum volutpat fames tempus taciti pellentesque amet amet primis neque mattis. Dictum volutpat fames tempus taciti.",
      time: '2:44 PM',
      newDay: '',
      id: uuidv4()
    },
    {
      isUser: false,
      text: "Hi Jennie, I am fine what about you?",
      time: '2:43 PM',
      newDay: '',
      id: uuidv4()
    },
    {
      isUser: true,
      text: "Lorem ipsum odor? todor? huodor hjhkhask aamet, consectetuer adipiscing elit. Sed eros nullam fermentum viverra ante amet justo. Facilisi justo bibendum mus ante augue sem. Malesuada natoque urna ornare primis neque mattis. Dictum volutpat fames tempus taciti pellentesque amet amet primis neque mattis. Dictum volutpat fames tempus taciti.",
      time: '2:44 PM',
      newDay: '',
      id: uuidv4()
    },
    {
      isUser: false,
      text: "Lorem ipsum odor amet amet amet amet, consectetuer adipiscing elit. Sed eros nullam fermentum viverra ante amet justo. Facilisi justo bibendum mus ante augue sem. Malesuada natoque urna ornare primis neque mattis. Dictum volutpat fames ues wei ccr tempus taciti pellentesque amet amet. Aenean facilisis lacus mi interdum lacinia proin.",
      time: '2:44 PM',
      newDay: '',
      id: uuidv4()
    },
    {
      isUser: true,
      text: "Lorem ipsum odor amet amet amet amet, consectetuer adipiscing elit. Sed eros nullam fermentum viverra ante amet justo. Facilisi justo bibendum mus ante augue sem. Malesuada natoque urna ornare primis neque mattis. Dictum volutpat fames ues wei ccr tempus taciti pellentesque amet amet. Aenean facilisis lacus mi interdum lacinia proin.",
      time: '2:44 PM',
      newDay: 'November 15, 2024',
      id: uuidv4()
    }
  ]);

  const bottomOfPanelRef = useRef(null);

  useEffect(() => {
    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView();
    }
  }, [thread])



  return (
    <div className="flex-1 flex flex-col bg-white px-6 pb-4 rounded-lg">
      <ChatHeader />
      <div className={`relative flex-1 w-full pt-12  flex flex-col gap-6 ${ChatCss.messageThread} overflow-y-auto`}>
        {thread.map((message, index) => <Message key={message.id} text={message.text} isUser={message.isUser} time={message.time} newDay={message.newDay} index={index} />)}
        <div ref={bottomOfPanelRef} className='h-10 w-fu p-5'></div>
      </div>
      <div className='relative w-full h-[50px] rounded-[20px] bg-neutral-200'>
        <input type='text' placeholder='Write a Message' className="w-full h-full outline-none rounded-[20px] bg-neutral-200 pl-4 pr-14 font-normal text-md placeholder:text-neutral-400" />
        <Image
          src="/assets/send.png"
          alt="user image"
          layout="fixed"
          width={100}
          height={100}
          className="absolute top-1/2 transform translate-y-[-50%] right-2 cursor-pointer w-[35px] h-[35px] border-black rounded-full"
        />
      </div>
    </div>
  )
}

export default Chat