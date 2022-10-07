import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/store'
import { fetchUserDataState } from './actions'

// ユーザの初期状態
export type InitialUserStateType = {
  isLoggedIn: boolean
  userData?: UserData
}
const initialState: InitialUserStateType = {
  isLoggedIn: false,
}

export const userSlice = createSlice({
  // 初回レンダリング時にユーザドキュメントからデータを取得する
  extraReducers: (builder) => {
    builder.addCase(fetchUserDataState.fulfilled, (state, action) => {
      if (action.payload) {
        const userData = action.payload
        state.isLoggedIn = true
        state.userData = userData
      }
    })
  },
  // 初期状態
  initialState,
  name: 'user',

  reducers: {},
})

// Reducer→Storeと接続するため
export const userReducer = userSlice.reducer

// Selecter→状態を取り出す
export const selectUserId = (state: RootState) => state.user.userData?._id
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn
