"use client"

import { useState } from 'react';
import ChatHeader from './chatHeader'
import Today from './today'
import Message from './message';

// type for the group of message threads between user and mentor
interface threadType {
  isUser: boolean;
  text: string
  time: string
  newDay: string
}

const Chat = () => {

  const [thread, setThread] = useState<threadType[]>([
    {
      isUser: true,
      text: "Hi, How are you?",
      time: '2:43 PM',
      newDay: 'November 14, 2024'
    },
    {
      isUser: false,
      text: "Hi Jennie, I am fine what about you?",
      time: '2:43 PM',
      newDay: ''
    },
    {
      isUser: true,
      text: "Lorem ipsum odor? todor? huodor hjhkhask aamet, consectetuer adipiscing elit. Sed eros nullam fermentum viverra ante amet justo. Facilisi justo bibendum mus ante augue sem. Malesuada natoque urna ornare primis neque mattis. Dictum volutpat fames tempus taciti pellentesque amet amet primis neque mattis. Dictum volutpat fames tempus taciti.",
      time: '2:44 PM',
      newDay: ''
      
    },
    {
      isUser: false,
      text: "Lorem ipsum odor amet amet amet amet, consectetuer adipiscing elit. Sed eros nullam fermentum viverra ante amet justo. Facilisi justo bibendum mus ante augue sem. Malesuada natoque urna ornare primis neque mattis. Dictum volutpat fames ues wei ccr tempus taciti pellentesque amet amet. Aenean facilisis lacus mi interdum lacinia proin.",
      time: '2:44 PM',
      newDay: ''
    },
    {
      isUser: true,
      text: "Lorem ipsum odor amet amet amet amet, consectetuer adipiscing elit. Sed eros nullam fermentum viverra ante amet justo. Facilisi justo bibendum mus ante augue sem. Malesuada natoque urna ornare primis neque mattis. Dictum volutpat fames ues wei ccr tempus taciti pellentesque amet amet. Aenean facilisis lacus mi interdum lacinia proin.",
      time: '2:44 PM',
      newDay: 'November 15, 2024'
    }
  ])





  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg">
      <ChatHeader />
      <div className='relative h-full w-full flex-1 pt-12 px-4 pb-4'>

        <div className="flex flex-col gap-6 w-full">
        {thread.map((message, index) => <Message text={message.text} isUser={message.isUser} time={message.time} newDay={message.newDay} index={index}/> )}
        </div>
      </div>
    </div>
  )
}

export default Chat