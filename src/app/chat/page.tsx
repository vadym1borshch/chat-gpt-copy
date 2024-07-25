'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { currentUsersSelector } from '@/store/slices/usersSlice/selectors/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { USER } from '@/common/vars'
import { AppDispatch } from '@/store/store'
import { deleteCurrentUserAction } from '@/store/slices/usersSlice/usersSlice'
import SideBar from '@/components/SideBar/SideBar'
import useMediaQuery from '@/hooks/useMediaQuery'
import {
  addMessageAction,
  createNewChat,
  setCurrentChatId,
} from '@/store/slices/chatSlice/chatSlice'
import {
  chatsSelector,
  currentChatSelector,
} from '@/store/slices/chatSlice/selectors/selectors'
import { v4 } from 'uuid'

interface IChatProps {
  // define your props here
}

const Chat = ({}: IChatProps) => {
  const user = useSelector(currentUsersSelector)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [prompt, setPrompt] = useState('')
  const chats = useSelector(chatsSelector)
  const chatID = useSelector(currentChatSelector)

  const currentChat = chats.find((chat) => chat.id === chatID)

  const isSmall = useMediaQuery('(max-width: 600px)')

  const getFirstTwoWords = (str: string) => {
    const words = str.split(' ')
    return words.slice(0, 2).join(' ')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()
      if (res.ok) {
        const message = data.result.choices[0].message.content
        if (!chats.length) {
          const id = v4()
          dispatch(
            createNewChat({
              id,
              messages: [{ id: v4(), message: message, prompt: prompt }],
              title: getFirstTwoWords(prompt),
            })
          )
          setPrompt('')
          dispatch(setCurrentChatId({ id }))
        }
        dispatch(
          addMessageAction({
            id: chatID,
            message: { id: v4(), message: message, prompt: prompt },
          })
        )
        setPrompt('')
        // setResponse(data.result.choices[0].message.content);
      } else {
        console.error(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const signOutHandler = () => {
    signOut()
    dispatch(deleteCurrentUserAction())
  }

  useEffect(() => {
    if (!user) {
      router.push('/')
      localStorage.removeItem(USER)
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
          return (
            <Fragment key={i}>
              <div className="flex justify-end rounded bg-yellow-100 p-1 text-gray-800">
                {chat.prompt}
              </div>
              <div className="rounded bg-blue-100 p-1 text-gray-800">
                {chat.message}
              </div>
            </Fragment>
          )
        })}
      </div>

      <footer className="flex h-[100px] items-center bg-gray-400 p-2">
        <div className="relative w-full">
          <input
            value={prompt}
            className="h-[40px] w-full rounded-md px-2 transition-transform duration-300 ease-in-out"
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (!prompt) {
                  return
                }
                handleSubmit(e)
              }
            }}
          />
        </div>
      </footer>
    </div>
  )
}

export default Chat
