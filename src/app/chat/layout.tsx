'use client'
import React, { ReactNode, useId } from 'react'
import MainContent from '@/components/MainContent/MainContent'
import SideBar from '@/components/SideBar/SideBar'
import useMediaQuery from '@/hooks/useMediaQuery'
import { createNewChat } from '@/store/slices/chatSlice/chatSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { v4 } from 'uuid'

interface IChatLayoutProps {
  children?: ReactNode
}

const ChatLayout = ({ children }: IChatLayoutProps) => {
  const isSmall = useMediaQuery('(max-width: 640px)')
  const dispatch = useDispatch<AppDispatch>()

  return (
    <MainContent>
      <div
        className={`left-0 top-0 z-10 w-1/4 ${!isSmall ? 'relative w-1/4' : 'absolute m-8'}`}
      >
        <SideBar
          side="left"
          height="full"
          width={isSmall ? 'md' : 'sm'}
          isSmall={isSmall}
        >
          <button
            className="w-full rounded-md bg-emerald-500 p-2 text-center"
            onClick={() => {
              dispatch(createNewChat({ id: v4(), messages: [], title: '' }))
            }}
          >
            New chat +
          </button>
          <div className="overflow-auto">items</div>
        </SideBar>
      </div>
      {children}
    </MainContent>
  )
}

export default ChatLayout
