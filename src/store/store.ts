import { configureStore } from '@reduxjs/toolkit'
import usersSlice from '@/store/slices/usersSlice/usersSlice'

export const store = configureStore({
  reducer: {
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Типи для використання з TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
