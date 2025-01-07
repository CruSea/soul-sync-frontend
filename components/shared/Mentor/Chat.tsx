'use client';

import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Card } from '@/components/ui/card';
import { ScrollArea } from './chat-scrollarea';
import ChatHeader from './ChatHeader';
import Message from './Message';
import { ChatProps, threadType } from '@/types/mentor';
import { transformChatData } from '@/lib/utils';
import InputArea from './InputArea';
import { jsonServer } from '@/data/end-points';

const Chat = ({
  userMessages,
  setUserMessages,
  currentConversation
}: ChatProps) => {
  // text is where the text box saves what the mentor writes
  const [text, setText] = useState<string>('');
  const socket = new WebSocket('ws://localhost:8080');

  const chatData = transformChatData(userMessages?.messages);

  // an empty div at the end of the thread used to scroll to the bottom on send
  const bottomOfPanelRef = useRef<HTMLDivElement | null>(null);

  // a referance for where the you will write the text
  const textBox = useRef<HTMLInputElement | null>(null);

  socket.onmessage = ({ data }) => {
    console.log("message from server ", data);
  }

  const sendText = async (messageText: string) => {
    if (!messageText.trim()) return; // Don't send empty messages

    const newMessage = {
      "type": "SENT",
      "createdAt": new Date().toISOString(),
      "body": messageText
    }

    socket.send(JSON.stringify(newMessage))





    // const newMessage = {
    //   sender: 'mentor',
    //   dateTime: new Date().toISOString(), // Get current time
    //   content: messageText.trim(),
    // };
  };

  useEffect(() => {
    // Scroll to the bottom whenever `thread` changes
    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView({ behavior: 'smooth' }); // Optional: Add smooth scrolling
    }

    // sets the input box to empty when changing from one mentee to another
    if (textBox.current) {
      textBox.current.value = "";
    }
  }, [userMessages]);

  return (
    <>
      {userMessages && (
        <Card className="flex-1 h-full rounded-[10px] flex flex-col justify-between overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* the header that shows user name*/}
            <ChatHeader 
              id= {currentConversation.id} 
              platform={currentConversation.platform}
            />

            {/* the chat thread between the user and mentor */}
            <ScrollArea className="flex-1 overflow-hidden relative w-full pt-3 px-6 flex flex-col gap-8">
              {chatData?.map((message) => (
                <div key={message.id} className="w-full relative py-4">
                  <Message {...message} />
                </div>
              ))}

              <div ref={bottomOfPanelRef} className="h-10 w-full p-5"></div>
            </ScrollArea>
          </div>

          {/*textbox where you input text */}
          <InputArea ref={textBox} sendText={sendText} />
        </Card>
      )}
    </>
  );
};

export default Chat;
