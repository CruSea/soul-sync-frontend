"use client"

import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Card,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import ChatHeader from './ChatHeader'
import Message from './Message';


// type for the group of message threads between user and mentor
interface threadType {
  isUser: boolean;
  text: string
  time: string
  newDay: string
  id: string
}

interface ChatProps {
  toggleProfileInView: () => void
}

const Chat: React.FC<ChatProps> = ({ toggleProfileInView }) => {
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
    const bottomOfPanelRef = useRef<HTMLDivElement | null>(null);

    // a referance for where the you will write the text
    const textBox = useRef<HTMLInputElement | null>(null);
  
    useEffect(() => {
      // Scroll to the bottom whenever `thread` changes
      if (bottomOfPanelRef.current) {
        bottomOfPanelRef.current.scrollIntoView({ behavior: "smooth" }); // Optional: Add smooth scrolling
      }
    }, [thread]);


    const sendText = (messageText: string) => {
      // adds a message from the mentor to the thread and sets the text box to empty
  
      setThread((prevThread) => [...prevThread, {isUser: false,
        text: messageText,
        time: '2:44 PM',
        newDay: '',
        id: uuidv4()} ])
      
      if (textBox.current) {
        textBox.current.value = ''
      }
    }

  return (
    <Card className="flex-1 rounded-[10px] flex flex-col ">
      {/* the header that shows user name*/}
      <ChatHeader toggleProfileInView={toggleProfileInView}/>

      {/* the chat thread between the user and mentor*/}
      <ScrollArea>
        <div className={`relative flex-1 w-full pt-3 px-6 flex flex-col gap-6`}>
          {thread.map((message, index) => <Message key={message.id} {...message} />)}
          <div ref={bottomOfPanelRef} className='h-10 w-full p-5'></div>
        </div>
      </ScrollArea>

      {/*textbox where you input text */}
      <div className='relative flex gap-2.5 mx-4 mb-4 h-[50px]'>
        <Input 
          ref={textBox}
          placeholder='Write a Message' 
          className="h-full rounded-md bg-neutral-200 outline-none border border-neutral-300 pl-4 pr-4 font-normal text-md placeholder:text-neutral-400" 
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

        {/* send button*/}
        <Button
          onClick={() => {
            // sends the text value when clicking send
            sendText(text)
          }}
        >
          <img src="/assets/send.svg" />
        </Button>
      </div>
    </Card>
  )
}

export default Chat;