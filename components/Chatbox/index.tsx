"use client"

import { useEffect, useRef } from "react";
import Message from "../Message";

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
      <div className="max-h-[500px] overflow-auto border-2 border-orange-400" ref={scrollChatRef}>
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
      <div className="flex justify-between gap-4 mt-3">
        <input 
          className="grow min-w-0 outline-none p-2 rounded-lg bg-slate-200" 
          type="text" 
          value={inputValue} 
          onChange={(e) => onInputValueChange && onInputValueChange(e.target.value)}
        />
        <button 
          className="px-4 bg-orange-300 rounded-lg"
          onClick={() => onSendClick && onSendClick()}
        >
            Send
        </button>
      </div>
    </div>
  )
}