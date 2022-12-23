import { RootState } from '~/store'

import { createSlice } from '@reduxjs/toolkit'

// ユーザの初期状態
export type InitialBearStateType = {
  messageHistory: MessageHistory
}
const initialState: InitialBearStateType = {
  messageHistory: [],
}

export const bearSlice = createSlice({
  // 初期状態
  initialState,
  name: 'bear',
  reducers: {
    // 現在のメッセージ履歴を保存
    messageHistoryState: (state, action) => {
      const message = action.payload.message
      state.messageHistory = [message, ...state.messageHistory]
    },
  },
})

// Reducer→Storeと接続するため
export const bearReducer = bearSlice.reducer

// Selecter→状態を取り出す
export const selectMessageHistory = (state: RootState) =>
  state.bear.messageHistory

// action
export const { messageHistoryState } = bearSlice.actions
