import { createAsyncThunk } from '@reduxjs/toolkit'

// ログイン成功時に走る関数
export const fetchUserDataState = createAsyncThunk('user/postUserDataState', async (arg: { userData: UserData }) => {
  const { userData } = arg
  return userData
})
