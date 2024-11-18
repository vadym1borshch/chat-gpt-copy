'use client'
import React, { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { currentUsersSelector } from '@/store/slices/usersSlice/selectors/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { deleteCurrentUserAction } from '@/store/slices/usersSlice/usersSlice'
import SideBar from '@/components/SideBar/SideBar'
import useMediaQuery from '@/hooks/useMediaQuery'
import {
  chatsSelector,
  currentChatSelector,
} from '@/store/slices/chatSlice/selectors/selectors'
import ChatFooter from '@/app/chat/components/footer'
import Answers from '@/app/chat/components/answers'
import { USER } from '@/common/vars'
import { fetchChats, resetCurrentChatId } from '@/store/slices/chatSlice/chatSlice'

interface IChatProps {
  // define your props here
}

const Chat = ({}: IChatProps) => {
  const user = useSelector(currentUsersSelector)
  const chats = useSelector(chatsSelector)
  const chatID = useSelector(currentChatSelector)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const currentChat = chats.find((chat) => chat.id === chatID)
  const isSmall = useMediaQuery('(max-width: 600px)')
  const [isOpen, setIsOpen] = useState(false)

  const signOutHandler = () => {
    localStorage.removeItem(USER)
    dispatch(resetCurrentChatId())
    dispatch(deleteCurrentUserAction())
    //signOut()
  }

  useEffect(() => {
    if (user) {
      dispatch(fetchChats({ userId: user.id }))
    }
  }, [dispatch, user])

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [router, user])

  return (
    <div
      className={`${!isSmall ? 'flex-1' : 'w-full'} relative z-0 flex h-screen flex-col`}
    >
      <div className="absolute right-0 top-0 z-10 m-8 flex flex-col gap-2">
        <SideBar side="right" isOpen={isOpen} setIsOpenCallback={setIsOpen} >
          <div className="flex flex-col gap-2">
            <span className="text-center">Signed in as {user?.name}</span>
            <button onClick={signOutHandler}>Sign out</button>
          </div>
        </SideBar>
      </div>

      {currentChat?.conversations.length ?
        <div className="flex w-full flex-1 flex-col gap-4 overflow-auto p-20">
          {currentChat?.conversations.map((chat, i) => {
            return (
              <Answers key={i} message={chat.answer} prompt={chat.prompt} />
            )
          })}
        </div> : <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 overflow-auto p-20">
          type something to get answer
        </div>
      }

      <ChatFooter />
    </div>
  )
}

export default Chat
