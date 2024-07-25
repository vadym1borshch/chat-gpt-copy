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

const Home = () => {
  const user = useSelector(currentUsersSelector)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    async function fetchProviders() {
      const res = await fetch('/api/auth/providers')
      const data = await res.json()
      dispatch(setProvidersAction(data))
    }

    fetchProviders()
  }, [])

  useEffect(() => {
    const storageUser = localStorage.getItem(USER)
    if (storageUser) {
      dispatch(setCurrentUserAction(JSON.parse(storageUser) as ICurrentUser))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchUsersFromDB())
  }, [])

  useEffect(() => {
    if (!!user) {
      router.push('/chat')
    }
  }, [user, router])

 /* if (status === 'loading') {
    return (
      <div className="flex min-h-screen w-full items-center justify-center text-[48px] font-bold italic">
        LOADING.....
      </div>
    )
  }*/

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
