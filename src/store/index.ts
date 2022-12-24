import { bearReducer } from './bear/bearSlice'
import { themeReducer } from './theme/themeSlice'
import { userReducer } from './user/userSlice'

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // action 全体を無視
        ignoredActions: ['bear/messageHistoryState'],
        ignoredPaths: ['bear.messageHistory.0.date'],
      },
    }),
  reducer: {
    user: userReducer,
    theme: themeReducer,
    bear: bearReducer,
  },
})

// 型定義
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
