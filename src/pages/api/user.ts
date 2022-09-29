import axios from 'axios'

const url = process.env.NEXT_PUBLIC_BASE_URL ?? ''

// スタンプを送信する: PATCH
// (stampId: string?, userId: string) => { 返り値が謎 }
export const sendUserStatus = async (stampId: string, userId: string) => {
  const data = { stampId }
  const result = await axios.patch(`${url}/user/status/${userId}`, data)
  return result.data.response
}

// メッセージの送信履歴を取得する: GET
// (userId: string) => string[]
export const getMessageHistory = async (userId: string): Promise<string[]> => {
  const result = await axios.get(`${url}/bear/history/${userId}`)
  return result.data.message
}
