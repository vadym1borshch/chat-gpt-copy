'use client'
import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import MenuIcon from '@/common/svg/menu-dots'
import useMediaQuery from '@/hooks/useMediaQuery'

interface ISideBarProps {
  side?: 'left' | 'right' | 'bottom' | 'top'
  width?: 'full' | 'sm' | 'md'
  height?: 'full' | 'sm' | 'md'
  callback?: (open: boolean) => void
  isSmall?: boolean
  children: ReactNode
}

const SideBar: React.FC<ISideBarProps> = ({
  side = 'left',
  width,
  callback,
  height,
  isSmall,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false)


  const toggleHandler = useMemo(() => {
    if (isSmall === undefined) {
      return () => {
        setIsOpen(!isOpen)
        callback && callback(isOpen)
      }
    }
    return () => {
      if (!isSmall) {
        return
      }
      setIsOpen(!isOpen)
      callback && callback(isOpen)
    }
  }, [callback, isOpen, isSmall])

  const h =
    height === 'full'
      ? 'h-full'
      : height === 'md'
        ? 'h-1/2'
        : height === 'sm'
          ? 'h-1/4'
          : ''
  const w =
    width === 'full'
      ? 'w-full'
      : width === 'md'
        ? 'w-1/2'
        : width === 'sm'
          ? 'w-1/4'
          : 'w-auto'

  let translateClass, transformClass, fixedClass
  switch (side) {
    case 'left':
      translateClass = '-translate-x-full'
      fixedClass = `left-0 top-0 ${h} ${w}`
      break
    case 'right':
      translateClass = 'translate-x-full'
      fixedClass = `right-0 top-0 ${h} ${w}`
      break
    case 'top':
      translateClass = '-translate-y-full'
      fixedClass = `top-0 left-0 ${h} ${w}`
      break
    case 'bottom':
      translateClass = 'translate-y-full'
      fixedClass = `bottom-0 left-0 ${h} ${w}`
      break
    default:
      translateClass = '-translate-x-full'
      fixedClass = `left-0 top-0 ${h} ${w}`
  }
  transformClass = isOpen ? 'translate-x-0 translate-y-0' : translateClass

  useEffect(() => {
    if (isSmall !== undefined) {
      if (!isSmall) {
        setIsOpen(true)
      }
      if (isSmall) {
        setIsOpen(false)
      }
    }
  }, [isSmall])
  return (
    <div className={`${isSmall? "absolute": "relative"}`} onBlur={toggleHandler}>
      <button onClick={toggleHandler}>
        <MenuIcon />
      </button>
      <div
        className={`fixed ${fixedClass} top-0 ${side}-0 transform bg-gray-800 text-white ${transformClass} transition-transform duration-300 ease-in-out`}
      >
        <div className="overflow-auto p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default SideBar
