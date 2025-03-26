'use client';

import { Card } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';

import { transformChatData, transformWSData } from '@/lib/utils';
import { ChatProps, webSocketMessages, WSMessage } from '@/types/mentor';

import { useSocket } from '@/context/providers/SocketProvider';
import ChatHeader from './chat-header';
import { ScrollArea } from './chat-scrollarea';
import InputArea from './input-area';
import Message from './Message';

const Chat = ({ currentConversation, conversationMessages }: ChatProps) => {
  // text is where the text box saves what the mentor writes
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const [webSocketMessages, setWebSocketMessages] = useState<WSMessage[]>([]);
  // an empty div at the end of the thread used to scroll to the bottom on send
  const bottomOfPanelRef = useRef<HTMLDivElement | null>(null);
  const textBox = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('message', (msg) => {
      const data = msg;
      setWebSocketMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket?.off('message');
    };
  }, [socket]);

  const chatData = conversationMessages
    ? transformChatData(conversationMessages) // for when connecting to backend
    : [];

  const WSData = transformWSData(
    webSocketMessages.filter(
      (message) =>
        message.conversationId == currentConversation?.conversation_id
    ) as WSMessage[]
  );

  const sendText = () => {
    if (socket && message.trim() !== '') {
      const messageObject = {
        type: 'CHAT',
        metadata: {
          conversationId: currentConversation?.conversation_id,
        },
        payload: message,
      };
      socket.emit('message', JSON.stringify(messageObject));

      const now = new Date();
      const createdAt = now.toISOString();

      if (currentConversation) {
        const websocketMessage: WSMessage = {
          conversationId: currentConversation.conversation_id,
          type: 'SENT',
          body: message,
          createdAt: createdAt,
        };

        setWebSocketMessages((prevMessages) => [
          ...prevMessages,
          websocketMessage,
        ]);
      }

      console.log('message', messageObject);
      setMessage('');
    }
  };

  useEffect(() => {
    // Scroll to the bottom whenever `thread` changes
    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView({ behavior: 'smooth' }); // Optional: Add smooth scrolling
    }
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
              {[...chatData, ...WSData]?.map((message) => (
                <div key={message.id} className="w-full relative py-4">
                  <Message {...message} />
                </div>
              ))}

              <div ref={bottomOfPanelRef} className="h-10 w-full p-5"></div>
            </ScrollArea>
          </div>

          {/*textbox where you input text */}
          <InputArea
            sendText={sendText}
            message={message}
            setMessage={setMessage}
          />
        </Card>
      )}
    </>
  );
};

export default Chat;
