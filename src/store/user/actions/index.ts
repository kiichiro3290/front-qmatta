import { getCommunityList, getUserInfo } from '~/api/client/back/user'

import { createAsyncThunk } from '@reduxjs/toolkit'

// 初回ログイン時にユーザの情報を取得
export const fetchUserDataState = createAsyncThunk(
  'user/fetchUserDataState',
  async () => {
    const userData = await getUserInfo()
    return userData
  }
)

// communityList を取得
export const fetchCommunityList = createAsyncThunk(
  'user/fetchCommunityList',
  async () => {
    const data = await getCommunityList()
    return data
  }
)
