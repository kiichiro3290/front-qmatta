import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCommunityList } from '~/pages/api/user'

// ログイン成功時に走る関数
export const fetchUserDataState = createAsyncThunk(
  'user/fetchUserDataState',
  (userData: UserData) => {
    return userData
  }
)

// communityList を取得
export const fetchCommunityList = createAsyncThunk(
  'user/fetchCommunityList',
  async (userId: string) => {
    const data = await getCommunityList(userId)
    return data
  }
)
