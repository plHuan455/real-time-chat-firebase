"use client"
import Image from 'next/image'
import { auth, db } from '@/configs/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { query, addDoc, collection, serverTimestamp, orderBy, onSnapshot, limit, getDocs } from "firebase/firestore";
import Chatbox, { ChatMessageTypes } from '@/components/Chatbox';
import { useEffect, useMemo, useState } from 'react';

export interface MessageType {
  avatar: string;
  createdAt: { seconds: number; nanoseconds: number };
  id: string;
  name: string;
  text: string;
  uid: string;
}

export default function Home() {
  const [messages, setMessages] = useState<MessageType[]>();

  const [name, setName] = useState<string>('');

  const [user] = useAuthState(auth)


  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", 'desc'),
      limit(12),
    )

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages: any[] = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id })
      })
      setMessages(messages)
    })

    return () => unsubscribe()
  }, []);

  const convertedChatMessage = useMemo<ChatMessageTypes[]>(() => {
    return messages?.map(value => ({
      id: value.id,
      name: value.name,
      avatar: value.avatar,
      text: value.text,
      isMe: user?.uid === value.uid,
    })) ?? []
  }, [messages, user])

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  }

  const googleSignOut = () => {
    auth.signOut();
  }

  const handleSend = async () => {

    // if (!user) {
    //   alert("Need login");
    //   return;
    // }

    // const q = query(
    //   collection(db, "messages"),
    //   orderBy("createdAt", 'desc'),
    //   limit(8),
    // )
    // const querySn = await getDocs(q)
    // let documents: any[] = [];
    // querySn.forEach(doc => {
    //   documents.push({ id: doc.id, ...doc.data() });
    // });
    // console.log(`aaaaaaaaaadataaaaaaa`, documents)
    
    const { uid, displayName, photoURL } = user ?? {};

    const res = await addDoc(collection(db, "messages"), {
      text: inputValue,
      name: name,
      avatar: "https://picsum.photos/300/300",
      createdAt: serverTimestamp(),
      uid: name,
    })

    // const res = await addDoc(collection(db, "messages"), {
    //   text: inputValue,
    //   name: displayName,
    //   avatar: photoURL,
    //   createdAt: serverTimestamp(),
    //   uid: uid,
    // })

    console.log(res)

    setInputValue('')
  }
  return (
    <main className="p-24">
      <h1>
        NextJS Chat app
        {user && <div className='flex items-center text-orange-500 gap-2'>
          <img src={user.photoURL ?? ''} className="w-10 h-10 rounded-full" alt="" /> <p>{user.displayName} {user.email}</p>
          </div>}
        <div>
          <input value={name} onChange={(e) => setName(e.target.value)} className='bg-slate-300 outline-none p-2' />
        </div>
      </h1>
      <p className="flex justify-end">
        {user ? (
          <button onClick={googleSignOut}>Sign Out</button>
        ) : (
          <button onClick={googleSignIn}>Sign In</button>
        )}
      </p>
      <div>
        <h2>Chat box</h2>
        <div>
          <Chatbox
            inputValue={inputValue}
            onSendClick={handleSend}
            messageList={convertedChatMessage}
            onInputValueChange={(value) => setInputValue(value)}
          />
        </div>
      </div>
    </main>
  )
}
