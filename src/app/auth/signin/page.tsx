'use client'

import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { setCurrentUser } from '@/store/slices/usersSlice/usersSlice'

const SignIn = () => {
  const [providers, setProviders] = useState<Record<string, any> | null>(null)
  const { data: session, status } = useSession()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    async function fetchProviders() {
      const res = await fetch('/api/auth/providers')
      const data = await res.json()
      setProviders(data)
    }

    fetchProviders()
  }, [])

  useEffect(() => {
    if (session?.user) {
      router.push('/chat')
      dispatch(
        setCurrentUser({
          id: 1,
          email: session!.user.email,
          name: session!.user.name,
        })
      )
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        email: session!.user.email,
        name: session!.user.name,
      }))
    }
  }, [dispatch, router, session, session?.user])

  return (
    <div className="flex flex-col gap-2">
      {providers &&
        Object.values(providers).map((provider: any) => (
          <div className="flex flex-col items-center gap-2" key={provider.name}>
            <span>or</span>
            <button
              className="rounded-md bg-blue-400 px-4 py-2 text-white hover:bg-blue-500"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </div>
  )
}
export default SignIn
