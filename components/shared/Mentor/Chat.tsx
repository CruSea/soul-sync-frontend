'use client';

import {  useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

import { ChatProps } from '@/types/mentor';
import { transformChatData } from '@/lib/utils';

import { jsonServer } from '@/data/end-points';
import ChatHeader from './chat-header';
import { ScrollArea } from './chat-scrollarea';
import Message from './message';
import InputArea from './InputArea';


const Chat = ({
  userMessages,
  toggleDrawer,
  userDetails,
  setUserMessages,
}: ChatProps) => {
  // text is where the text box saves what the mentor writes
  
  const chatData = transformChatData(userMessages?.messages);

  // an empty div at the end of the thread used to scroll to the bottom on send
  const bottomOfPanelRef = useRef<HTMLDivElement | null>(null);

  // a referance for where the you will write the text
  const textBox = useRef<HTMLInputElement | null>(null);

  const sendText = async (messageText: string) => {
    if (!messageText.trim()) return; // Don't send empty messages

    const newMessage = {
      sender: 'mentor',
      dateTime: new Date().toISOString(), // Get current time
      content: messageText.trim(),
    };

    try {
      // Find the current id from props
      if (!userMessages) {
        return;
      }

      // Append the new message to the messages array
      const updatedMessages = [...userMessages.messages, newMessage];

      // Update the backend
      const patchResponse = await fetch(
        `${jsonServer.baseUrl}/${jsonServer.messages}/${userMessages.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: updatedMessages }),
        }
      );

      if (textBox.current) textBox.current.value = ''; // Reset input field

      setUserMessages({ ...userMessages, messages: updatedMessages });
    } catch (error) {
      throw new Error(error as string);
    }
  };

  useEffect(() => {
    // Scroll to the bottom whenever `thread` changes
    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView({ behavior: 'smooth' }); // Optional: Add smooth scrolling
    }
  }, [userMessages]);

  return (
    <>
      {userMessages && (
        <Card className="flex-1 h-full rounded-[10px] flex flex-col justify-between overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* the header that shows user name*/}
            <ChatHeader
              imageUrl={userMessages.imageUrl}
              fullName={userMessages.fullName}
              email={userMessages.email}
              toggleDrawer={toggleDrawer}
              userDetails={userDetails}
            />

            {/* the chat thread between the user and mentor*/}
            <ScrollArea className="flex-1 overflow-hidden relative w-full pt-3 px-6 flex flex-col gap-8">
              {chatData?.map((message, index) => (
                <div key={message.id} className="w-full relative py-4">
                  <Message imageUrl={userMessages.imageUrl} {...message} />
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
