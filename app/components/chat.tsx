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

  // an empty div at the end of the thread used to scroll to the bottom on send
  const bottomOfPanelRef = useRef(null); 

  // a refrance chat text box
  const textBox = useRef(null)

  useEffect(() => {
    // when a new message arrives on the thread, it scrolls it to the bottom referance div

    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView();
    }
  }, [thread])



  const sendText = (messageText) => {
    // adds a message from the mentor to the thread and sets the text box to empty

    setThread((prevThread) => [...prevThread, {isUser: false,
      text: messageText,
      time: '2:44 PM',
      newDay: '',
      id: uuidv4()} ])
    textBox.current.value = ''
  }


  return (
    <div className="flex-1 flex flex-col bg-white pb-4 rounded-lg items-center">
      {/* the header that shows user name*/}
      <ChatHeader />

      {/* the chat thread between the user and mentor*/}
      <div className={`relative flex-1 w-full pt-12 px-6 flex flex-col gap-6 ${ChatCss.messageThread} overflow-y-auto`}>
        {thread.map((message, index) => <Message key={message.id} text={message.text} isUser={message.isUser} time={message.time} newDay={message.newDay} index={index} />)}
        <div ref={bottomOfPanelRef} className='h-10 w-fu p-5'></div>
      </div>

      {/* the text box the mentor writes in*/}
      <div className='relative w-[95%] h-[50px] rounded-[20px] bg-neutral-200'>
        <input 
          type='text' 
          ref={textBox}
          placeholder='Write a Message' 
          className="w-full h-full outline-none rounded-[20px] bg-neutral-200 pl-4 pr-14 font-normal text-md placeholder:text-neutral-400" 
          onChange={(e) => {
            // updates the value of the text state whenever something is written
            setText(e.target.value);
          }}
          onKeyDown={(e) => {
            // sends the text value when pressing enter
            if (e.key === "Enter") {
              e.preventDefault(); // Prevents newline on enter in the textarea
              sendText(text);
              
            }
          }}
        />

        {/* the sending Image on the text pox*/}
        <Image
          src="/assets/send.png"
          alt="user image"
          layout="fixed"
          width={100}
          height={100}
          className="absolute top-1/2 transform translate-y-[-50%] right-2 cursor-pointer w-[35px] h-[35px] border-black rounded-full"
          onClick={() => {
            // sends the text value when clicking send
            sendText(text)
          }}
        />
      </div>
    </div>
  )
}

export default Chat