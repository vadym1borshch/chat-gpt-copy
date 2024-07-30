'use client'
import React from 'react'
import Dropdown from '@/components/DropDown/DropDown'
import MenuDots from '@/common/svg/menu-dots'
import {
  ChatType,
  deleteChatAction,
  setCurrentChatId,
} from '@/store/slices/chatSlice/chatSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import api from '@/services/api'

interface IDialogProps {
  chat: ChatType
}

const Dialog: React.FC<IDialogProps> = ({ chat }) => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div
      onClick={() => {
        dispatch(setCurrentChatId({ id: chat.id }))
      }}
      className="flex w-full cursor-pointer items-center justify-center rounded-md bg-amber-50 p-2 text-gray-800"
    >
      <span className="flex w-3/4"> {chat.title}</span>
      <span className="relative flex w-1/4 justify-end">
        <Dropdown icon={<MenuDots width={30} />}>
          <button
            onClick={() => {
              dispatch(deleteChatAction({ id: chat.id }))

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
