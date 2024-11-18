import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export type MessageType = {
  id: string
  answer: string
  prompt: string
}

export type ChatType = {
  id: string
  conversations: MessageType[]
  title: string
}

export interface IChatSlice {
  chats: ChatType[]
  currentChatId: string | null
}

const initialState: IChatSlice = {
  chats: [],
  currentChatId: null,
}

export const fetchChats = createAsyncThunk(
  'chats',
  async (params: { userId: string; chatId?: string | null }, { dispatch }) => {
    const { userId, chatId } = params
    try {
      const res = await axios.get(`/api/conversations?id=${userId}`)
      return { chats: res.data, chatId }
    } catch (error) {
      console.error('Failed to fetch chats:', error)
    }
  }
)

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChatId: (state, action: PayloadAction<{ id: string }>) => {
      state.currentChatId = action.payload.id
    },
    resetCurrentChatId: (state) => {
      state.currentChatId = null
    },
  },
  extraReducers: (builder) => {
    builder
      /*.addCase(fetchUsersFromDB.pending, (state) => {
        state.status = 'loading';
      })*/
      .addCase(
        fetchChats.fulfilled,
        (
          state,
          action: PayloadAction<
            { chats: ChatType[]; chatId: string | null | undefined } | undefined
          >
        ) => {
          // state.status = 'succeeded';
          if (action.payload) {
            const chats = action.payload.chats
            state.chats = chats
            if (action.payload.chats.length === 1) {
              state.currentChatId = chats[0].id
              return
            }
            if (chats.length > 1) {
              if (action.payload.chatId) {
                state.currentChatId = action.payload.chatId
                return
              }
              state.currentChatId = chats[chats.length - 1].id
            }
          }

        }
      )
    /*  .addCase(fetchUsersFromDB.rejected, (state, action) => {
        state.status = 'failed';
        //state.error = action.error.message ?? 'Не вдалося отримати користувачів';
      });*/
  },
})

export const { setCurrentChatId, resetCurrentChatId } = chatSlice.actions

export default chatSlice.reducer
