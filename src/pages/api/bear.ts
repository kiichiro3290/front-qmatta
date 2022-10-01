import axios from 'axios'
// swr はデータ取得専用
// https://www.sukerou.com/2019/05/axios.html
// import useSWR from 'swr'

const url = process.env.NEXT_PUBLIC_BASE_URL ?? ''

// クマのメッセージを取得する（簡易版）: GET
// () => message: string
export const fetchQmaMessage = async () => {
  const data = await axios.get(url).then((res) => res.data)
  return data
}

// クマのメッセージを取得する & メッセージをDBに保存: POST
// (userID: string, message: string) => message: string
export const postQmaMessage = async (userId: string, message: string): Promise<string> => {
  const data: UserMessageToBear = { message }
  const result = await axios.post(`${url}/bear/${userId}`, data)
  return result.data.response
}
