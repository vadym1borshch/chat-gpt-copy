'use client'
import React from 'react'
import Dropdown from '@/components/DropDown/DropDown'
import MenuDots from '@/common/svg/menu-dots'
import {
  ChatType,
  fetchChats,
  resetCurrentChatId,
  setCurrentChatId,
} from '@/store/slices/chatSlice/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { currentChatSelector } from '@/store/slices/chatSlice/selectors/selectors'
import axios from 'axios'
import { currentUsersSelector } from '@/store/slices/usersSlice/selectors/selectors'

interface IDialogProps {
  chat: ChatType
}

const Dialog: React.FC<IDialogProps> = ({ chat }) => {
  const dispatch = useDispatch<AppDispatch>()
  const chatId = useSelector(currentChatSelector)
  const user = useSelector(currentUsersSelector)
  return (
    <div
      onClick={() => {
        dispatch(setCurrentChatId({ id: chat.id }))
      }}
      className="flex w-full cursor-pointer items-center justify-center rounded-md bg-amber-50 p-2 text-gray-800"
    >
      <span
        className={`flex w-3/4 ${chat.id === chatId ? 'bg-amber-500' : ''}`}
      >
        {chat.title}
      </span>
      <span className="relative flex w-1/4 justify-end">
        <Dropdown icon={<MenuDots width={30} />}>
          <button
            onClick={async () => {
              await axios.delete(`/api/conversations?id=${chatId}`)
              if (user) {
                dispatch(fetchChats({ userId: user.id }))
              }
              dispatch(resetCurrentChatId())
            }}
          >
            Delete
          </button>
        </Dropdown>
      </span>
    </div>
  )
}

export default Dialog
