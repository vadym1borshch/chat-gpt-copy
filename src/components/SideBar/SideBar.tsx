'use client'
import React, { ReactNode, useEffect, useState, useRef } from 'react'
import MenuIcon from '@/common/svg/menu-dots'
import { useOutsideClick } from '@/hooks/useOutsideClick'

interface ISideBarProps {
  side?: 'left' | 'right' | 'bottom' | 'top'
  width?: 'full' | 'sm' | 'md'
  height?: 'full' | 'sm' | 'md'
  isSmall?: boolean
  children: ReactNode
  isOpen: boolean
  setIsOpen?: (value: boolean) => void
  setIsOpenCallback?: (value: boolean) => void
}

const SideBar: React.FC<ISideBarProps> = ({
  side = 'left',
  width,
  height,
  isSmall,
  children,
  isOpen,
  setIsOpen,
  setIsOpenCallback,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const closeHandler = () => {
    if (isSmall) {
      setIsOpen && setIsOpen(false)
      return
    }
    setIsOpenCallback && setIsOpenCallback(false)
  }

  useOutsideClick(ref, closeHandler)

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
        setIsOpen && setIsOpen(true)
      }
      if (isSmall) {
        setIsOpen && setIsOpen(false)
      }
    }
  }, [isSmall, setIsOpen])

  return (
    <div
      ref={ref}
      className={`${isSmall ? 'absolute' : 'relative'} z-10 overflow-auto`}
    >
      <button
        onClick={(e) => {
          if (isSmall) {
            setIsOpen && setIsOpen(true)
            return
          }
          setIsOpenCallback && setIsOpenCallback(true)
        }}
      >
        <MenuIcon />
      </button>
      <div
        className={`fixed ${fixedClass} top-0 ${side}-0 transform bg-gray-800 text-white ${transformClass} transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col gap-8 overflow-auto p-4">{children}</div>
      </div>
    </div>
  )
}

export default SideBar
