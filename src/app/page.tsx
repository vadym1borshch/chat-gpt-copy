'use client'
import SignIn from '@/app/auth/signin/page'
import SignUp from '@/components/Forms/SignupForm'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { fetchUsersFromDB } from '@/store/slices/usersSlice/usersSlice'
import { currentUsersSelector } from '@/store/slices/usersSlice/selectors/selectors'
import { useRouter } from 'next/navigation'

const Home = () => {
  const user = useSelector(currentUsersSelector)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
   dispatch(fetchUsersFromDB())
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      router.push('/chat')
    }
  }, [router, user])


  return (
    <div className="flex h-screen w-full flex-col items-center">
      <h1>for continue - sign in or sign up, please</h1>
      <SignUp />
      <SignIn />
    </div>
  )
}
export default Home
