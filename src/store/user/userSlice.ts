import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/store'
import { fetchCommunityList, fetchUserDataState } from './actions'

// ユーザの初期状態
export type InitialUserStateType = {
  isLoggedIn: boolean
  userData?: UserData
  communityList: string[]
}
const initialState: InitialUserStateType = {
  communityList: [],
  isLoggedIn: false,
}

export const userSlice = createSlice({
  extraReducers: (builder) => {
    // 初回レンダリング時にユーザドキュメントからデータを取得する
    builder.addCase(fetchUserDataState.fulfilled, (state, action) => {
      if (action.payload) {
        const userData = action.payload
        state.isLoggedIn = true
        state.userData = userData
      }
    }),
      // コミュニティリストを取得する
      builder.addCase(fetchCommunityList.fulfilled, (state, action) => {
        if (action.payload) {
          const communityList = action.payload
          state.communityList = communityList
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
export const selectCommunityList = (state: RootState) =>
  state.user.communityList
