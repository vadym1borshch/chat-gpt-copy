'use client'

import { useState } from 'react'
import axios from 'axios'
import { AppDispatch } from '@/store/store'
import { useDispatch } from 'react-redux'
import { setCurrentUserAction } from '@/store/slices/usersSlice/usersSlice'
import SignIn from '@/app/auth/signin/page'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async () => {
    try {
      const res = await axios.get(`api/users?email=${email}`)
      dispatch(setCurrentUserAction(res.data))

    } catch (error: any) {
      setError(error.response.data.error)
    }
  }

  const signInHandler = async () => {
    if (!email || !password) {
      setError('please fill all fields')
      return
    }

    const res = await axios.post('api/users', { email, password })
    if (res.data.error) {
      setError(res.data.error)
      return
    }
    dispatch(setCurrentUserAction(res.data))
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
