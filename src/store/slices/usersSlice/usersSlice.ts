import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IUser } from '@/app/api/users/route'

export interface ICurrentUser extends IUser {
  name?: string | null
}

export interface IInitialState {
  users: IUser[]
  currentUser: ICurrentUser | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: IInitialState = {
  users: [],
  currentUser: null,
  status: 'idle',
}

export const fetchUsersFromDB = createAsyncThunk(
  'users',
  // Declare the type your function argument here:
  async () => {
    try {
      const users = await axios.get('/api/users')
      return users.data
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state: IInitialState, action: PayloadAction<ICurrentUser>) => {
      state.currentUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      /*.addCase(fetchUsersFromDB.pending, (state) => {
        state.status = 'loading';
      })*/
      .addCase(
        fetchUsersFromDB.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          // state.status = 'succeeded';
          state.users = action.payload
        }
      )
    /*  .addCase(fetchUsersFromDB.rejected, (state, action) => {
        state.status = 'failed';
        //state.error = action.error.message ?? 'Не вдалося отримати користувачів';
      });*/
  },
})

export const { setCurrentUser } = usersSlice.actions

export default usersSlice.reducer
