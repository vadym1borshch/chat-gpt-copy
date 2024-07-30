'use client'

import { signIn, useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { USER } from '@/common/vars'
import { providersSelector } from '@/store/slices/usersSlice/selectors/selectors'


const SignIn = () => {
  const providers = useSelector(providersSelector)
  const { data: session, status } = useSession()

  const signInHandler = (id: any) => {
    signIn(id)
    if (session?.user) {
      localStorage.setItem(
        USER,
        JSON.stringify({
          id: 1,
          email: session!.user.email,
          name: session!.user.name,
        })
      )
    }
  }


  return (
    <div className="flex flex-col gap-2">
      {providers &&
        Object.values(providers).map((provider: any) => {
          return (
            <div
              className="flex flex-col items-center gap-2"
              key={provider.name}
            >
              <span>or</span>
              <button
                className="rounded-md bg-blue-400 px-4 py-2 text-white hover:bg-blue-500"
                onClick={() => signInHandler(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
          )
        })}
    </div>
  )
}
export default SignIn
