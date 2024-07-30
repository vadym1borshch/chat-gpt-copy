'use client'
import React, { ReactNode } from 'react'
import MainContent from '@/components/MainContent/MainContent'
import SideBar from '@/components/SideBar/SideBar'
import useMediaQuery from '@/hooks/useMediaQuery'
import Dialogs from '@/components/Dialogs/Dialogs'

interface IChatLayoutProps {
  children?: ReactNode
}

const ChatLayout = ({ children }: IChatLayoutProps) => {
  const isSmall = useMediaQuery('(max-width: 640px)')

  return (
    <MainContent>
      <div
        className={`left-0 top-0 w-1/4 ${!isSmall ? 'relative w-1/4' : 'absolute m-8'}`}
      >
        <SideBar
          side="left"
          height="full"
          width={isSmall ? 'md' : 'sm'}
          isSmall={isSmall}
        >
          <Dialogs />
        </SideBar>
      </div>
      {children}
    </MainContent>
  )
}

export default ChatLayout
