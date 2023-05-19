"use client"
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef } from "react";
import Message from "../Message";
import InputWithEmoji from '../InputWithEmoji';

export interface ChatMessageTypes {
  id: string;
  name: string;
  avatar: string;
  text: string;
  isMe?: boolean;
}

interface Props {
  inputValue: string;
  messageList: ChatMessageTypes[];
  onInputValueChange?: (value: string) => void;
  onSendClick?: () => void;
}

export default function Chatbox ({
  inputValue, 
  messageList,
  onInputValueChange,
  onSendClick
}: Props) {
  const scrollChatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(scrollChatRef.current) {
      const { offsetHeight, scrollHeight } = scrollChatRef.current
      scrollChatRef.current.scrollTo({top: scrollHeight})
    }
  }, [messageList])
  return (
    <div className="t-chatbox">
      <div className="max-h-[500px] overflow-auto border-2 border-orange-400 border-b-0" ref={scrollChatRef}>
        <div className="flex flex-col-reverse justify-end gap-3 p-4">
          {messageList.map(value => (
            <Message 
              key={value.id}
              avatar={value.avatar}
              name={value.name}
              text={value.text}
              isMe={value.isMe}
            />
          ))}
        </div>
      </div>
      <div >
        <InputWithEmoji onSendClick={console.log}/>
      </div>
    </div>
  )
}