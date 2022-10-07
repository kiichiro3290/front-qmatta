import { createAsyncThunk } from '@reduxjs/toolkit'

// ログイン成功時に走る関数
export const fetchUserDataState = createAsyncThunk('user/fetchUserDataState', async (userData: UserData) => {
  return userData
})
