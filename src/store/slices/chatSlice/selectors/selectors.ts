import { RootState } from '@/store/store'

export const chatsSelector = (state: RootState) => state.chats.chats
export const currentChatSelector = (state: RootState) => state.chats.currentChatId