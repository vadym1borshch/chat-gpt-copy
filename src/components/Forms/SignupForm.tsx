'use client'

import { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import {
  fetchUsersFromDB,
  setCurrentUserAction,
} from '@/store/slices/usersSlice/usersSlice'
import { usersSelector } from '@/store/slices/usersSlice/selectors/selectors'
import { USER } from '@/common/vars'
import { useRouter } from 'next/navigation'
import { compare } from 'bcryptjs'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(usersSelector)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('please fill all fields')
      return
    }
    try {
      const res = await axios.post('/api/auth/signup', { email, password })
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred')
    }
    dispatch(fetchUsersFromDB())
  }

  const signInHandler = () => {
    const user = users.find((u) => u.email === email)

    if (!email || !password) {
      setError('please fill all fields')

      return
    }
    if (user) {
      const handleComparePassword = async () => {
        try {
          const match = await compare(password, user.password as string);
          if (!match) {
            setError("Passwords don't match")
            return
          }
          console.log(user)
          const curUser = { id: user.id, email: user.email, name: user.email }
          dispatch(setCurrentUserAction(curUser))
          localStorage.setItem(USER, JSON.stringify(curUser))
          router.push("/chat")
          return
        } catch (err) {
          console.error('Error comparing password:', err);
        }
      }
      handleComparePassword()

    }
    if (!user) {
      setError('user does not exist, please register')
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <form className="flex w-full flex-col items-center gap-2">
        <input
          className="h-[40px] w-1/4 min-w-[150px] rounded-md border-2 border-amber-300 px-1"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <input
          className="h-[40px] w-1/4 min-w-[150px] rounded-md border-2 border-amber-300 px-1"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
      </form>
      <div>
        <button
          onClick={handleSubmit}
          className="w-[100px] rounded-md bg-emerald-500 text-center text-white hover:bg-emerald-600"
          type="submit"
        >
          Sign Up
        </button>
        <button
          className="w-[100px] rounded-md bg-emerald-500 text-center text-white hover:bg-emerald-600"
          onClick={signInHandler}
        >
          Sign In
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
