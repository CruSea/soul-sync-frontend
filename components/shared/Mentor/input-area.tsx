'use client';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { InputAreaProps } from '@/types/mentor';

const InputArea = ({ sendText, message, setMessage }: InputAreaProps) => {
  return (
    <div className="relative flex gap-2.5 mx-4 mb-4 h-[50px]">
      <Input
        placeholder="Write a Message"
        className="h-full rounded-md bg-neutral-200 outline-none border border-neutral-300 pl-4 pr-4 font-normal text-md placeholder:text-neutral-400"
        onChange={(e) => {
          // updates the value of the text state whenever something is written
          setMessage(e.target.value);
        }}
        value={message}
        onKeyDown={(e) => {
          // sends the text value when pressing enter
          if (e.key === 'Enter') {
            e.preventDefault(); // Prevents newline on enter in the textarea
            //sendText(inputText);
            sendText();
          }
        }}
      />

      {/* send button*/}
      <Button
        className="h-full"
        onClick={() => {
          // sends the text value when clicking send
          //sendText(inputText);
          sendText();
        }}
      >
        <Image
          alt="send button"
          className="w-8 h-auto"
          width={10}
          height={10}
          src="/assets/send.svg"
        />
      </Button>
    </div>
  );
};

export default InputArea;
