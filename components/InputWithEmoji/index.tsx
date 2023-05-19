"use client"

import { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';

const IconPicker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);
interface Props {
  isShowEmojiList?: boolean;
  onClose?: () => void;
  onSendClick?: (value: string) => void;
}

export default function InputWithEmoji ({
  isShowEmojiList,
  onSendClick,
  onClose,
}: Props) {
  const inputRef = useRef<HTMLDivElement>(null);

  const [isShowEmoji, setIsShowEmoji] = useState<boolean>(false);

  const handleIconClick = () => {
    setIsShowEmoji(preState => !preState)
    onClose && onClose()
  }

  const handleSelectEmoji = (emoji: EmojiClickData) => {
    setIsShowEmoji(false);
    onClose && onClose();
    if(inputRef.current) {
      inputRef.current.innerHTML = 
        inputRef.current.innerHTML + 
        `<img src='https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${emoji.unified}.png' alt='icon'/>`;
      const sel = window.getSelection();
      sel?.collapse(inputRef.current, inputRef.current.childNodes.length);
    }
  }

  const handleSendClick = () => {
    onSendClick && onSendClick(inputRef.current?.innerHTML ?? '')
  }

  return (
    <div className="t-inputWithEmoji border-2 border-slate-500 py-3">
      <div className="flex items-center">
        <div className="t-inputWithEmoji_emoji relative group/emoji">
          <div className="cursor-pointer p-2" onClick={handleIconClick}>
            O
          </div>
          {Boolean(isShowEmojiList ?? isShowEmoji) && (
            <div className="absolute">
              <IconPicker
                emojiStyle={'google' as EmojiStyle}
                searchDisabled
                onEmojiClick={handleSelectEmoji}
                skinTonesDisabled
              />
            </div>
          )}
        </div>
        <div className="t-inputWithEmoji_input grow ml-2">
          <div 
            contentEditable 
            className=" outline-none overflow-auto p-2 max-h-[104px] bg-slate-200 [&_img]:inline [&_img]:w-5 [&_img]:h-5" 
            ref={inputRef} 
          />
        </div>
        <button className="text-slate-500 px-3 ml-2" onClick={handleSendClick}>
          Send
        </button>
      </div>
    </div>
  )
}