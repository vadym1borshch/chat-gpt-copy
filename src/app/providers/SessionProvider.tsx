'use client'
import React, { ReactNode } from 'react'
import { SessionProvider as Provider } from 'next-auth/react'
import { Provider as Redux } from 'react-redux'
import { store } from '@/store/store'

interface ISessionProviderProps {
  children: ReactNode
}

const SessionProvider = ({ children }: ISessionProviderProps) => {
  return (
    <Redux store={store}>
      <Provider>{children}</Provider>
    </Redux>
  )
}

export default SessionProvider
