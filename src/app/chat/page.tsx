'use client'
import React, { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { currentUsersSelector } from '@/store/slices/usersSlice/selectors/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { USER } from '@/common/vars'
import { AppDispatch } from '@/store/store'
import { deleteCurrentUser } from '@/store/slices/usersSlice/usersSlice'
import SideBar from '@/components/SideBar/SideBar'
import useMediaQuery from '@/hooks/useMediaQuery'

interface IChatProps {
  // define your props here
}

const Chat = ({}: IChatProps) => {
  const user = useSelector(currentUsersSelector)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [query, setQuery] = useState('')

  const isSmall = useMediaQuery('(max-width: 600px)')
  const signOutHandler = () => {
    signOut()
    dispatch(deleteCurrentUser())
  }

  useEffect(() => {
    if (!user) {
      router.push('/')
      localStorage.removeItem(USER)
    }
  }, [router, user])

  return (
    <div
      className={`${!isSmall ? 'flex-1' : 'w-full'} relative z-0 flex h-screen flex-col`}
    >
      <div className="absolute right-0 top-0 z-10 m-8 flex flex-col gap-2">
        <SideBar side="right">
          <div className="flex flex-col gap-2">
            <span className="text-center">Signed in as {user?.name}</span>
            <button onClick={signOutHandler}>Sign out</button>
          </div>
        </SideBar>
      </div>

      <div className="flex w-full flex-1 flex-col overflow-auto">
        <div className="h-full w-full p-20">answers</div>
      </div>

      <footer className="flex h-[100px] items-center bg-gray-400 p-2">
        <div className="relative w-full">
          <input
            className="h-[40px] w-full rounded-md px-2 transition-transform duration-300 ease-in-out"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (!query) {
                  return
                }
                console.log(query)
              }
            }}
          />
        </div>
      </footer>
    </div>
  )
}

export default Chat

