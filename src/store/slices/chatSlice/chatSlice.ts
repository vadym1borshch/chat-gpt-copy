import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '@/services/api'

export type MessageType = {
  id: string
  message: string
  prompt: string
}

export type ChatType = {
  id: string
  messages: MessageType[]
  title: string
}

export interface IChatSlice {
  chats: ChatType[]
  currentChatId: string
}

const initialState: IChatSlice = {
  chats: [],
  currentChatId: '',
}


export const fetchChats = createAsyncThunk(
  'chats',
  // Declare the type your function argument here:
  async (email: string) => {
    try {
      const chats = await api.get('/conversations')
      const userChats = chats.data.find((chat:any) => chat.email === email)
      if (userChats) {
        return userChats.chats
      }
     return []
    } catch (error) {
      console.error('Failed to fetch chats:', error)
    }
  }
)

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createNewChat: (state: IChatSlice, action: PayloadAction<ChatType>) => {
      state.chats = [action.payload, ...state.chats]
      state.currentChatId = action.payload.id
    },
    setCurrentChatId: (
      state: IChatSlice,
      action: PayloadAction<{ id: string }>
    ) => {
      state.currentChatId = action.payload.id
    },
    addMessageAction: (
      state: IChatSlice,
      action: PayloadAction<{ id?: string; message: MessageType }>
    ) => {
      state.chats = state.chats.map((chat) => {
        if (chat.id === action.payload.id) {
          return {
            ...chat,
            messages: [...chat.messages, action.payload.message],
            title:
              chat.title === 'new chat'
                ? action.payload.message.prompt
                : chat.title,
          }
        }

        return chat
      })
    },
    deleteChatAction: (
      state: IChatSlice,
      action: PayloadAction<{ id: string }>
    ) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload.id)
    },
  },
  extraReducers: (builder) => {
    builder
      /*.addCase(fetchUsersFromDB.pending, (state) => {
        state.status = 'loading';
      })*/
      .addCase(
        fetchChats.fulfilled,
        (state, action: PayloadAction<ChatType[]>) => {
          // state.status = 'succeeded';
          state.chats = action.payload
        }
      )
    /*  .addCase(fetchUsersFromDB.rejected, (state, action) => {
        state.status = 'failed';
        //state.error = action.error.message ?? 'Не вдалося отримати користувачів';
      });*/
  },
})

export const {
  addMessageAction,
  setCurrentChatId,
  createNewChat,
  deleteChatAction,
} = chatSlice.actions

export default chatSlice.reducer
