import axios from 'axios'
// swr はデータ取得専用
// https://www.sukerou.com/2019/05/axios.html
// import useSWR from 'swr'

const url = process.env.NEXT_PUBLIC_BASE_URL ?? ''
const mebo_url = process.env.NEXT_PUBLIC_MEBO_URL ?? ''

// クマのメッセージを取得する（簡易版）: GET
// () => message: string
export const fetchQmaMessage = async () => {
  const data = await axios.get(`${url}/bear`).then((res) => res.data.response)
  return data
}

// クマのメッセージを取得する & メッセージをDBに保存: POST
// (userID: string, message: string) => message: string
export const postQmaMessage = async (userId: string, message: string): Promise<string> => {
  const data: UserMessageToBear = { message }
  const result = await axios
    .post(`${url}/bear/${userId}`, data)
    .then((res) => res.data.response)
    .catch((e) => console.log(e))
  return result
}
// meboのapiを叩いて，返答を取得する
// 無料版で800messages/month, ¥2800/monthで10000messages/month
// (userID: string, message: string) => message: string
export const getAIQmaMessage = async (userId: string, message: string): Promise<string> => {
  const data = {
    agent_id: process.env.NEXT_PUBLIC_MEBO_AGENT_ID,
    api_key: process.env.NEXT_PUBLIC_MEBO_API_KEY,
    uid: userId,
    utterance: message,
  }
  const result = await axios.post(mebo_url, data)
  const answer = result.data.bestResponse.utterance
  return answer
}
