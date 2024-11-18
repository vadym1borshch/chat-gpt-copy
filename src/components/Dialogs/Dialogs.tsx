'use client'
import React from 'react'
import { fetchChats } from '@/store/slices/chatSlice/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { chatsSelector } from '@/store/slices/chatSlice/selectors/selectors'
import Dialog from '@/components/Dialogs/Dialog'
import axios from 'axios'
import { currentUsersSelector } from '@/store/slices/usersSlice/selectors/selectors'

interface IDialogsProps {
  setIsOpen: (isOpen: boolean) => void
  isSmall: boolean
}

const Dialogs: React.FC<IDialogsProps> = ({ setIsOpen, isSmall }) => {
  //const height = useWindowHeight()
  //const boxHeight = height - 100
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(currentUsersSelector)
  const chats = useSelector(chatsSelector)
  const reverseChats = [...chats].reverse()

  return (
    <>
      <div className="flex gap-2">
        <button
          className="w-full rounded-md bg-emerald-500 p-2 text-center"
          onClick={async () => {
            await axios.post(`api/conversations`, {
              userId: user?.id,
              prompt: 'newChat',
            })
            if (user) {
              dispatch(fetchChats({ userId: user.id }))
            }
          }}
        >
          New chat +
        </button>
        {isSmall && (
          <button
            className="rounded-md bg-emerald-500 p-2 text-center"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        )}
      </div>

      <div
        className={`z-20 flex flex-col gap-2 overflow-auto py-2`}
        style={{ height: `${700}px` }}
      >
        {reverseChats.map((chat) => {
          return <Dialog chat={chat} key={chat.id} />
        })}
      </div>
    </>
  )
}

export default Dialogs
