'use client';

import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Card } from '@/components/ui/card';
import { ScrollArea } from './chat-scrollarea';
import ChatHeader from './ChatHeader';
import Message from './Message';
import {
  ChatProps,
  threadType,
  WSMessage,
  WSSentMessage,
  webSocketMessages
} from '@/types/mentor';
import { transformChatData, transformWSData } from '@/lib/utils';
import InputArea from './InputArea';
import { jsonServer } from '@/data/end-points';


const Chat = ({
  userMessages,
  currentConversation,
  webSocketMessages,
  socket,
}: ChatProps) => {
  // const chatData = userMessages
  //  ? transformChatData(userMessages[0]?.messages) //                                                      //for when connecting to json server
  //  : [];

  const [filteredWSMessages, setFilteredWSMessages] = useState<webSocketMessages>([])

  const chatData = userMessages
    ? transformChatData(userMessages) // for when connecting to backend
    : [];

  useEffect(() => {
    console.log("websocket message changed", webSocketMessages)
    const filteredMessages = webSocketMessages.filter((message) =>
      'conversationId' in message // if it is a recieved message or sent message
        ? message.conversationId === currentConversation.conversation_id
        : message.metadata.conversationId ===
          currentConversation.conversation_id
    )

    setFilteredWSMessages(filteredMessages)
  }, [webSocketMessages])



  const WSData = transformWSData(webSocketMessages as WSMessage[]); // get the mentorId from the token next time

  // an empty div at the end of the thread used to scroll to the bottom on send
  const bottomOfPanelRef = useRef<HTMLDivElement | null>(null);

  // a referance for where the you will write the text
  const textBox = useRef<HTMLInputElement | null>(null);

  const sendText = async (messageText: string) => {
    if (!messageText.trim() || !socket) return; // Don't send empty messages

    const now = new Date();
    const createdAt = now.toISOString();

    const newMessage: WSSentMessage = {
      type: 'CHAT',
      metadata: {
        conversationId: currentConversation.conversation_id,
      },
      payload: messageText,
    };

    socket.emit('message', JSON.stringify(newMessage));
  };

  useEffect(() => {
    // Scroll to the bottom whenever `thread` changes
    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView({ behavior: 'smooth' }); // Optional: Add smooth scrolling
    }

    // // sets the input box to empty when changing from one mentee to another
    // if (textBox.current) {
    //   textBox.current.value = "";
    // }
  }, [userMessages, webSocketMessages]);

  return (
    <>
      {userMessages && (
        <Card className="flex-1 h-full rounded-[10px] flex flex-col justify-between overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* the header that shows user name*/}
            <ChatHeader
              id={currentConversation.conversation_id}
              platform={currentConversation.platform}
            />

            {/* the chat thread between the user and mentor */}
            <ScrollArea className="flex-1 overflow-hidden relative w-full pt-3 px-6 flex flex-col gap-8">
              {[...chatData, ...WSData]?.map((message) => (
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
