'use client'
import React, { ReactNode } from 'react'

interface IMainContentProps {
  children: ReactNode
}

const MainContent: React.FC<IMainContentProps> = ({ children }) => {
  return (
    <main className="relative flex min-h-screen w-full ">
      {children}
    </main>
  )
}

export default MainContent
