'use client'
import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import MainContent from '@/components/MainContent/MainContent'
import SideBar from '@/components/SideBar/SideBar'
import useWindowSize from '@/hooks/useWindowSize'
import useMediaQuery from '@/hooks/useMediaQuery'

interface IChatLayoutProps {
  children?: ReactNode
}

const ChatLayout = ({ children }: IChatLayoutProps) => {
  const [point, setPoint] = useState<'sm' | 'normal'>('normal')

  const isSmall = useMediaQuery('(max-width: 640px)')

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
          <span>items</span>
        </SideBar>
      </div>
      {children}
    </MainContent>
  )
}

export default ChatLayout
