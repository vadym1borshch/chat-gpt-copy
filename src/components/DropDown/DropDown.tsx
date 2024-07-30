'use client'
import { useState, useRef, useEffect, FC, ReactNode } from 'react'

interface IDropdownProps {
  children: ReactNode
  icon: ReactNode
}

const Dropdown: FC<IDropdownProps> = ({ children, icon }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className=" " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded py-2 text-white"
      >
        {icon}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-0 rounded border border-gray-200 bg-white p-2 shadow-lg">
          {children}
        </div>
      )}
    </div>
  )
}

export default Dropdown
