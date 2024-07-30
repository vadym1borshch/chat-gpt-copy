'use client'
import React, { useState } from 'react'
import { v4 } from 'uuid'
import {
  addMessageAction,
  createNewChat,
  setCurrentChatId,
} from '@/store/slices/chatSlice/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import {
  chatsSelector,
  currentChatSelector,
} from '@/store/slices/chatSlice/selectors/selectors'
import axios from 'axios'
import { currentUsersSelector } from '@/store/slices/usersSlice/selectors/selectors'
import api from '@/services/api'

const getFirstTwoWords = (str: string) => {
  const words = str.split(' ')
  return words.slice(0, 2).join(' ')
}

interface IChatFooterProps {}

const ChatFooter: React.FC<IChatFooterProps> = ({}) => {
  const [prompt, setPrompt] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(currentUsersSelector)
  const chats = useSelector(chatsSelector)
  const chatID = useSelector(currentChatSelector)
  const chat = chats.find((chat) => chat.id === chatID)


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
          const res = axios.post('api/conversations', {
            id,
            email: user?.email,
            message: { id: v4(), message: message, prompt: prompt },
            title: getFirstTwoWords(prompt),
          })

          return
        }
        dispatch(
          addMessageAction({
            id: chatID,
            message: { id: v4(), message: message, prompt: prompt },
          })
        )
        const res = axios.post('api/conversations', {
          id: chatID,
          email: user?.email,
          message: { id: chatID, message: message, prompt: prompt },
          title: getFirstTwoWords(prompt),
        })
        setPrompt('')
        // setResponse(data.result.choices[0].message.content);
      } else {
        console.error(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
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
  )
}

export default ChatFooter
