import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@prisma/client'

export interface IInitialState {
  currentUser: User | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'

}

const initialState: IInitialState = {
  currentUser: null,
  status: 'idle',
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUserAction: (
      state: IInitialState,
      action: PayloadAction<User>
    ) => {
      state.currentUser = action.payload
    },
    deleteCurrentUserAction: (state: IInitialState) => {
      state.currentUser = null
    },

  },
})

export const {
  setCurrentUserAction,
  deleteCurrentUserAction,
} = usersSlice.actions

export default usersSlice.reducer
