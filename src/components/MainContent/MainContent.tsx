'use client'
import React, { ReactNode } from 'react'
import useWindowSize from '@/hooks/useWindowSize'

interface IMainContentProps {
  children: ReactNode
}

const MainContent: React.FC<IMainContentProps> = ({ children }) => {
  const { width } = useWindowSize()
  return (
    <main className="flex min-h-screen w-full flex-col relative">
      <div className="flex flex-1 flex-grow bg-gray-500 w-full">{children}</div>
      <div className="flex h-[100px] w-full shrink-0 bg-gray-900">footer</div>
    </main>
  )
}

export default MainContent
