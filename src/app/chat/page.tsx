'use client'
import React, { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { currentUsersSelector } from '@/store/slices/usersSlice/selectors/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { USER } from '@/common/vars'
import { AppDispatch } from '@/store/store'
import { deleteCurrentUser } from '@/store/slices/usersSlice/usersSlice'

interface IChatProps {
  // define your props here
}

const Chat = ({}: IChatProps) => {
  const user = useSelector(currentUsersSelector)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const signOutHandler = () => {
    signOut()
    dispatch(deleteCurrentUser())
  }

  useEffect(() => {
    if (!user) {
      router.push('/')
      localStorage.removeItem(USER)
    }
  }, [router, user])

  return (
    <div className="relative z-0 w-full">
      chat
      {user && (
        <div className="absolute right-0 top-0 z-10 mx-8 flex flex-col gap-2">
          <span>Signed in as {user.name}</span>
          <button onClick={signOutHandler}>Sign out</button>
        </div>
      )}
    </div>
  )
}

export default Chat
