import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createNewChat: (state: IChatSlice, action: PayloadAction<ChatType>) => {
      state.chats.push(action.payload)
    },
    setCurrentChatId: (
      state: IChatSlice,
      action: PayloadAction<{ id: string }>
    ) => {
      state.currentChatId = action.payload.id
    },
    addMessageAction: (
      state: IChatSlice,
      action: PayloadAction<{id: string, message: MessageType}>
    ) => {

        state.chats = state.chats.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, messages: [action.payload.message, ...el.messages] }
        }

          return el
        })

    },
    deleteChatAction: (
      state: IChatSlice,
      action: PayloadAction<{ id: string }>
    ) => {
      state.chats.filter((el) => el.id !== action.payload.id)
    },
  },
})

export const {
  addMessageAction,
  setCurrentChatId,
  createNewChat,
  deleteChatAction,
} = chatSlice.actions

export default chatSlice.reducer
