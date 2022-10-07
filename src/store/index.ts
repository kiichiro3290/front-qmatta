import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // action 全体を無視
        ignoredActions: [],
        ignoredPaths: [],
      },
    }),
  reducer: {
    user: userReducer,
  },
})

// 型定義
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
