'use client'
import React, { useEffect } from 'react'
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
import axios from 'axios'

interface IChatProps {
  // define your props here
}


type ConversationType = {
  id: string
  email: string | null | undefined
  title: string
  messages: [{ id: string; message: string; prompt: string }]
}

const saveConversation = async (conversation: any) => {
  try {
    await axios.post('/api/conversations', conversation)
    console.log('Conversation saved successfully')
  } catch (error) {
    console.error('Error saving conversation:', error)
  }
}

const Chat = ({}: IChatProps) => {
  const user = useSelector(currentUsersSelector)
  const chats = useSelector(chatsSelector)
  const chatID = useSelector(currentChatSelector)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()


  const currentChat = chats.find((chat) => chat.id === chatID)
  const isSmall = useMediaQuery('(max-width: 600px)')


  const signOutHandler = () => {
    localStorage.removeItem(USER)
    dispatch(deleteCurrentUserAction())
    //signOut()

  }

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
        <SideBar side="right">
          <div className="flex flex-col gap-2">
            <span className="text-center">Signed in as {user?.name}</span>
            <button onClick={signOutHandler}>Sign out</button>
          </div>
        </SideBar>
      </div>

      <div className="flex w-full flex-1 flex-col gap-4 overflow-auto p-20">
        {currentChat?.messages.map((chat, i) => {
          return <Answers key={i} message={chat.message} prompt={chat.prompt} />
        })}
      </div>

      <ChatFooter />
    </div>
  )
}

export default Chat
