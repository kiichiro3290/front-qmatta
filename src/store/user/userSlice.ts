import { fetchCommunityList, fetchUserDataState } from './actions'

import { RootState } from '~/store'

import { createSlice } from '@reduxjs/toolkit'

// ユーザの初期状態
export type InitialUserStateType = {
  isLoggedIn: boolean
  userData?: UserData
  userName: string
  profile?: string
  status?: string
  communityList: Community[]
}
const initialState: InitialUserStateType = {
  communityList: [],
  isLoggedIn: false,
  userName: '未登録',
}

export const userSlice = createSlice({
  extraReducers: (builder) => {
    // 初回レンダリング時にユーザドキュメントからデータを取得する
    builder.addCase(fetchUserDataState.fulfilled, (state, action) => {
      if (action.payload) {
        const userData = action.payload
        const userName = userData.userName ?? '未登録'
        const profile = userData.profile ?? ''
        const status = userData.status ?? ''
        state.userName = userName
        state.profile = profile
        state.status = status
        state.isLoggedIn = true
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
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn
export const selectCommunityList = (state: RootState) =>
  state.user.communityList
