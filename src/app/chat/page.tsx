'use client'
import React, { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { currentUsersSelector } from '@/store/slices/usersSlice/selectors/selectors'
import { useSelector } from 'react-redux'

interface IChatProps {
  // define your props here
}

const Chat = ({}: IChatProps) => {
 const user = useSelector(currentUsersSelector)
  const router = useRouter()


  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [router, user])

  return (
    <div className="relative z-0 w-full">
      chat
      {user && (
        <div className="absolute right-0 top-0 z-10 flex flex-col gap-2 mx-8">
          <span>Signed in as {user.name}</span>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </div>
  )
}

export default Chat
