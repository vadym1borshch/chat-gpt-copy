import React, { ReactNode } from 'react'
import MainContent from '@/components/MainContent/MainContent'
import SideBar from '@/components/SideBar/SideBar'

interface IChatLayoutProps {
  children?: ReactNode
}

const ChatLayout = ({ children }: IChatLayoutProps) => {
  return (
    <MainContent>
      <SideBar />
      {children}
    </MainContent>
  )
}

export default ChatLayout
