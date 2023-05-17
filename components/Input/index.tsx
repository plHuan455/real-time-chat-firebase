"use client"
import { useState } from "react"

export default function Input () {
  const [value, setValue] = useState<string>('')
  return (
    <div>
      <label htmlFor="input-id">input lable</label>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
    </div>
  )
}