import InputWithEmoji from "@/components/InputWithEmoji";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
export default function Page () {
  return (
    <div className="p-test w-screen h-screen flex items-center justify-center">
      <div className="min-w-[500px]">
        <InputWithEmoji />
      </div>
    </div>
  )
}