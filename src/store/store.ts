import { configureStore } from '@reduxjs/toolkit'
import usersSlice from '@/store/slices/usersSlice/usersSlice'
import chatSlice from '@/store/slices/chatSlice/chatSlice'

export const store = configureStore({
  reducer: {
    users: usersSlice,
    chats: chatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Типи для використання з TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
