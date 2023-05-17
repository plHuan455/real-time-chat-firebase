interface Props {
  isMe?: boolean;
  name: string;
  avatar: string;
  text: string;
  createdAt?: number;
}

export default function Message ({
  isMe,
  name,
  avatar,
  text,
  createdAt,
}: Props) {
  if(isMe) 
    return (
      <div className="t-message flex items-center justify-end gap-2 w-full">
        <div className="flex gap-2">
          <p>{text}</p>
          <p className="text-green-600 font-semibold">:{name}</p>
        </div>
        <img className="w-10 h-10 rounded-full" src={avatar} alt="avatar" />
      </div>
  )

  return (
    <div className="t-message flex items-center gap-2 w-full">
      <img className="w-10 h-10 rounded-full" src={avatar} alt="avatar" />
      <div className="flex gap-2">
        <p className="text-slate-400 font-semibold">{name}:</p>
        <p>{text}</p>
      </div>
    </div>
  )
}