import { getCommunityList, getUserInfo } from '~/api/client/back/user'

import { createAsyncThunk } from '@reduxjs/toolkit'

// 初回ログイン時にユーザの情報を取得
export const fetchUserDataState = createAsyncThunk(
  'user/fetchUserDataState',
  async () => {
    // tokenを元にしてもう一度APIを叩く
    const userData = await getUserInfo()
    // console.log(userData)
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
