'use client';

import { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

import { ChatProps } from '@/types/mentor';
import { transformChatData } from '@/lib/utils';

import { jsonServer } from '@/data/end-points';
import ChatHeader from './chat-header';
import { ScrollArea } from './chat-scrollarea';
import Message from './Message';
import InputArea from './input-area';
import { useSocket } from '@/context/providers/SocketProvider';


const Chat = ({
  currentConversation,
  conversationMessages,
}: ChatProps) => {
  // text is where the text box saves what the mentor writes
  const socket = useSocket();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!socket) return;

    console.log("socket", socket)

    socket.on("message", (msg) => {
      setMessage(msg);
    });

    return () => {
      socket?.off("message");
    };
  }, [socket]);

  const chatData = conversationMessages
    ? transformChatData(conversationMessages) // for when connecting to backend
    : [];

  // useEffect(() => {
  //   console.log("curent messages", currentConversationMessages)
  //   const transformedWSData = transformWSData(currentConversationMessages as WSMessage[]);

  //   setWSData(transformedWSData);
  // }, [currentConversationMessages, currentConversation]);



  // const WSData = transformWSData(webSocketMessages as WSMessage[]); // get the mentorId from the token next time

  // an empty div at the end of the thread used to scroll to the bottom on send
  const bottomOfPanelRef = useRef<HTMLDivElement | null>(null);

  // a referance for where the you will write the text
  const textBox = useRef<HTMLInputElement | null>(null);

  const sendText = () => {
    if (socket && message.trim() !== "") {
      const messageObject = {
        type:"CHAT",
        metadata: {
          conversationId: currentConversation?.conversation_id
        },
        payload: message
      }
      socket.emit("chat_message", messageObject); 
      console.log("message", messageObject)
      setMessage("");
    }
  }

  // const sendText = async (messageText: string) => {
  //   if (!messageText.trim() || !socket) return; // Don't send empty messages

  //   const now = new Date();
  //   const createdAt = now.toISOString();

  //   const newMessage: WSSentMessage = {
  //     type: 'CHAT',
  //     metadata: {
  //       conversationId: currentConversation.conversation_id,
  //     },
  //     payload: messageText,
  //   };

  //   try {
  //     // Find the current id from props
  //     if (!userMessages) {
  //       return;
  //     }

  //     // Append the new message to the messages array
  //     const updatedMessages = [...userMessages.messages, newMessage];

  //     // Update the backend
  //     const patchResponse = await fetch(
  //       `${jsonServer.baseUrl}/${jsonServer.messages}/${userMessages.id}`,
  //       {
  //         method: 'PATCH',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ messages: updatedMessages }),
  //       }
  //     );

  //     if (textBox.current) textBox.current.value = ''; // Reset input field

  //     setUserMessages({ ...userMessages, messages: updatedMessages });
  //   } catch (error) {
  //     throw new Error(error as string);
  //   }

  //   socket.emit('message', JSON.stringify(newMessage));
  //   setWebSocketMessages((prevMessages) => [...prevMessages, WSFormatMessage]);
  // };

  useEffect(() => {
    // Scroll to the bottom whenever `thread` changes
    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView({ behavior: 'smooth' }); // Optional: Add smooth scrolling
    }

    // // sets the input box to empty when changing from one mentee to another
    // if (textBox.current) {
    //   textBox.current.value = "";
    // }
  }, [currentConversation, conversationMessages]);

  return (
    <>
      {currentConversation && (
        <Card className="flex-1 h-full rounded-[10px] flex flex-col justify-between overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* the header that shows user name*/}
            <ChatHeader
              id={currentConversation.conversation_id}
              platform={currentConversation.platform}
            />

            {/* the chat thread between the user and mentor */}
            <ScrollArea className="flex-1 overflow-hidden relative w-full pt-3 px-6 flex flex-col gap-8">
              {[...chatData]?.map((message) => (
                <div key={message.id} className="w-full relative py-4">
                  <Message {...message} />
                </div>
              ))}

              <div ref={bottomOfPanelRef} className="h-10 w-full p-5"></div>
            </ScrollArea>
          </div>

          {/*textbox where you input text */}
          <InputArea  sendText={sendText} message={message} setMessage={setMessage}/>
        </Card>
      )}
    </>
  );
};

export default Chat;
