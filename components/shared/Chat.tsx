"use client"

import { useState, useRef, useEffect } from 'react';
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
  // text is where the text box saves what the mentor writes
  const [text, setText] = useState<string>('')

  // a list of messages between the user and mentor
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
  ]);


  return (
    <div className="flex-1 min-h-full bg-white"></div>
  )
}

export default Chat;