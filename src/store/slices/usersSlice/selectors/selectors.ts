import { RootState } from '@/store/store'


export const usersSelector = (state: RootState) => state.users.users
export const currentUsersSelector = (state: RootState) => state.users.currentUser