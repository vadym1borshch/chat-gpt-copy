'use client'
import React from 'react'
import {
  createNewChat,
} from '@/store/slices/chatSlice/chatSlice'
import { v4 } from 'uuid'
import useWindowHeight from '@/hooks/useHeight'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { chatsSelector } from '@/store/slices/chatSlice/selectors/selectors'
import Dialog from '@/components/Dialogs/Dialog'

interface IDialogsProps {
  // define your props here
}

const Dialogs: React.FC<IDialogsProps> = ({}) => {
  //const height = useWindowHeight()
  //const boxHeight = height - 100
  const dispatch = useDispatch<AppDispatch>()
  const chats = useSelector(chatsSelector)

  return (
    <>
      <button
        className="w-full rounded-md bg-emerald-500 p-2 text-center"
        onClick={() => {
          dispatch(createNewChat({ id: v4(), messages: [], title: 'new chat' }))
        }}
      >
        New chat +
      </button>
      <div
        className={`z-20 flex flex-col gap-2 overflow-auto py-2`}
        style={{ height: `${700}px` }}
      >
        {chats.map((chat) => {
          return <Dialog chat={chat} key={chat.id} />
        })}
      </div>
    </>
  )
}

export default Dialogs
