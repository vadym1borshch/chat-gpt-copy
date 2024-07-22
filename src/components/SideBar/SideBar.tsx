'use client'
import React from 'react'
import useWindowSize from '@/hooks/useWindowSize'

interface ISideBarProps {
  // define your props here
}

const SideBar: React.FC<ISideBarProps> = ({}) => {

 // if (window.innerWidth < 700) return null
  return (
    <div
      className={`relative flex w-[400px] flex-col bg-amber-400 min-h-screen`}
    >
      side bar
    </div>
  )
}

export default SideBar
