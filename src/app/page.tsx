'use client'
import SignIn from '@/app/auth/signin/page'
import SignUp from '@/components/Forms/SignupForm'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import {
  fetchUsersFromDB,
  ICurrentUser,
  setCurrentUserAction,
  setProvidersAction,
} from '@/store/slices/usersSlice/usersSlice'
import { currentUsersSelector } from '@/store/slices/usersSlice/selectors/selectors'
import { useRouter } from 'next/navigation'
import { USER } from '@/common/vars'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { fetchChats } from '@/store/slices/chatSlice/chatSlice'

const Home = () => {
  const user = useSelector(currentUsersSelector)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { data: session, status } = useSession()



  useEffect(() => {
    dispatch(fetchUsersFromDB())
  }, [])


  useEffect(() => {
    if (user) {
      dispatch(fetchChats(user.email as string))
    }

  }, [user])


  useEffect(() => {
    const fetchProviders = async () => {
      const res = await axios.get('/api/auth/providers')
      if (!res) {
        throw new Error('Failed to fetch providers')
      }
      const data = await res.data
      dispatch(setProvidersAction(data))
    }

    fetchProviders()
  }, [])

  useEffect(() => {
    const storageUser = localStorage.getItem(USER)
    if (storageUser) {
      dispatch(setCurrentUserAction(JSON.parse(storageUser) as ICurrentUser))
      router.push('/chat')
    }
  }, [])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen w-full items-center justify-center text-[48px] font-bold italic">
        LOADING.....
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <h1 className="text-center text-[32px] font-bold italic">
        To continue - sign in or sign up, please
      </h1>
      <SignUp />
      <SignIn />
    </div>
  )
}
export default Home
