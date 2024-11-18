'use client'
import React, { useEffect, useRef, useState } from 'react'
import { fetchChats } from '@/store/slices/chatSlice/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { currentChatSelector } from '@/store/slices/chatSlice/selectors/selectors'
import axios from 'axios'
import { currentUsersSelector } from '@/store/slices/usersSlice/selectors/selectors'

interface IChatFooterProps {}

const ChatFooter: React.FC<IChatFooterProps> = ({}) => {
  const [prompt, setPrompt] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(currentUsersSelector)
  const chatId = useSelector(currentChatSelector)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatId) {
      await axios.post(`api/conversations`, {
        userId: user?.id,
        prompt,
      })
      setPrompt('')
    } else {
      await axios.put(`api/conversations`, {
        prompt,
        id: chatId,
      })
      setPrompt('')
    }

    if (user) {
      dispatch(fetchChats({ userId: user.id, chatId }))
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus() // Встановлюємо фокус на інпут
    }
  }, [chatId])

  return (
    <footer className="flex h-[100px] items-center bg-gray-400 p-2">
      <div className="relative w-full">
        <input
          ref={inputRef}
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

          <button
            className="absolute right-2.5 top-[50%] -translate-y-[50%] transform bg-amber-500"
            onClick={(e) => {
              if (!prompt) {
                return
              }
              handleSubmit(e)
            }}
          >
            Enter
          </button>

      </div>
    </footer>
  )
}

export default ChatFooter
