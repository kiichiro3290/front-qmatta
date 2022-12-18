// スタンプを送信する: PATCH

import qmattaClient from '..'

// (stampId: string?, userId: string) => { 返り値が謎 }
export const sendUserStatus = async (stampId: string, userId: string) => {
  const data = { stampId }
  const result = await qmattaClient().patch(`user/status/${userId}`, data)
  return result.data.response
}

// メッセージの送信履歴を取得する: GET
// (userId: string) => string[]
export const getMessageHistory = async (
  userId: string
): Promise<MessageHistory> => {
  const result = await qmattaClient().get(`bear/history/${userId}`)
  const data: ResMessageHistory = result.data

  const dates = result.data.date.map((raw: string) => {
    return new Date(raw)
  })

  const res = {
    messages: data.message,
    dates: dates,
  }

  return res
}

// 自分が加入しているコミュニティの一覧を取得する: GET
// (userId: string) => comunity_name: string[]
export const getCommunityList = async (userId: string): Promise<string[]> => {
  const result = await qmattaClient().get(`user/community/${userId}`)
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
  const response = await qmattaClient().post('signup', body)
  const data = response.data
  return { msg: data.msg, result: data.result }
}

// ログイン
// (emailAddress: string, password: string) => { result: boolean, user: User }
export const logInUser = async (emailAddress: string, password: string) => {
  const body = {
    emailAddress,
    password,
  }

  const response = await qmattaClient().post('login', body, {
    withCredentials: true,
  })

  const data = response.data
  return {
    code: data.code,
    token: data.token,
    expire: data.expire,
  }
}

// ユーザの情報を取得する
export const getUserInfo = async () => {
  console.log(qmattaClient().defaults)
  // const token = localStorage.getItem('token')
  // console.log(await fetchUser(token!))
  const response = await qmattaClient().get('user', {
    withCredentials: false,
  })
  const data = response.data
  return {
    userName: data.userName,
    profile: data.profile,
    status: data.status,
  }
}

// function main() {
//   login()
//     .then((data) => fetchUser(data.token))
//     .then((data) => console.log('user', data))
//     .catch((err) => console.error(err))
// }

// async function login() {
//   const res = await fetch('https://qmatta.mydns.jp/login', {
//     headers: {
//       'Access-Control-Request-Headers': 'X-Requested-With',
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//     body: JSON.stringify({
//       emailAddress: 'ddd@gmai.com',
//       password: 'testtest',
//     }),
//   })
//   return await res.json()
// }

// async function fetchUser(token: string) {
//   const res = await fetch('https://qmatta.mydns.jp/user', {
//     headers: {
//       'Access-Control-Request-Headers': 'X-Requested-With',
//       'Content-Type': 'application/json; charset=utf-8',
//       Authorization: 'Bearer ' + token,
//     },
//     method: 'GET',
//   })
//   return await res.json()
// }
