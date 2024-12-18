"use client";

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "./chat-scrollarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import { ChatProps, threadType } from "@/types/mentor";
import { transformChatData } from "@/lib/utils";
import Image from "next/image";

const Chat = ({ userMessages, toggleDrawer, userDetails }: ChatProps) => {
  // text is where the text box saves what the mentor writes
  const [text, setText] = useState<string>("");

  const chatData = transformChatData(userMessages?.messages);

  // an empty div at the end of the thread used to scroll to the bottom on send
  const bottomOfPanelRef = useRef<HTMLDivElement | null>(null);

  // a referance for where the you will write the text
  const textBox = useRef<HTMLInputElement | null>(null);

  return (
    <>
      {userMessages && (
        <Card className="flex-1 h-full rounded-[10px] flex flex-col justify-between overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* the header that shows user name*/}
            <ChatHeader imageUrl={userMessages.imageUrl} fullName={userMessages.fullName} email={userMessages.email} toggleDrawer={toggleDrawer} userDetails={userDetails}/>

            {/* the chat thread between the user and mentor*/}
            <ScrollArea className="flex-1 overflow-hidden relative w-full pt-3 px-6 flex flex-col gap-8">
              {chatData?.map((message, index) => (
                <div key={message.id} className="w-full relative py-4">
                  <Message
                    imageUrl={userMessages.imageUrl}
                    {...message}
                  />
                </div>
              ))}

              <div ref={bottomOfPanelRef} className="h-10 w-full p-5"></div>
            </ScrollArea>
          </div>

          {/*textbox where you input text */}
          <div className="relative flex gap-2.5 mx-4 mb-4 h-[50px]">
            <Input
              ref={textBox}
              placeholder="Write a Message"
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
              className="h-full"
              onClick={() => {
                // sends the text value when clicking send
                sendText(text);
              }}
            >
              <Image alt="send button" className="w-8 h-auto" width={10} height={10} src="/assets/send.svg" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default Chat;
