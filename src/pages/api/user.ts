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

// 自分が加入しているコミュニティの一覧を取得する: GET
// (userId: string) => comunity_name: string[]
export const getCommunityList = async (userId: string): Promise<string[]> => {
  const result = await axios.get(`${url}/user/community/${userId}`)
  const communityList = result.data.communityName
  return communityList
}

// ユーザの新規登録
// (emailAddress: string, password: string) => { result: boolean, msg: string }
export const signUpUser = async (emailAddress: string, password: string) => {
  const body = {
    emailAddress,
    password,
  }
  const response = await axios.post(`${url}/signup`, body)
  const data = response.data
  return { msg: data.msg, result: data.result }
}

// ユーザの認証
// (emailAddress: string, password: string) => { result: boolean, user: User }
export const logInUser = async (emailAddress: string, password: string) => {
  const body = {
    emailAddress,
    password,
  }
  const response = await axios.post(`${url}/login`, body)
  const data = response.data
  return { result: data.result, user: data.user }
}
