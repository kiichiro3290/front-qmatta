// クマのメッセージを取得する（簡易版）: GET

import { meboClient, qmattaClient } from './client'

// () => message: string
export const fetchQmaMessage = async () => {
  const data = await qmattaClient()
    .get('bear')
    .then((res) => res.data.response)
  return data
}

// クマのメッセージを取得する & メッセージをDBに保存: POST
// (userID: string, message: string) => message: string
export const postQmaMessage = async (
  userId: string,
  message: string
): Promise<string> => {
  const data: UserMessageToBear = { message }
  const result = await qmattaClient()
    .post(`/bear/${userId}`, data)
    .then((res) => res.data.response)
    .catch((e) => console.log(e))
  return result
}

// meboのapiを叩いて，返答を取得する
// 無料版で800messages/month, ¥2800/monthで10000messages/month
// (userID: string, message: string) => message: string
export const getAIQmaMessage = async (
  userId: string,
  message: string
): Promise<string> => {
  const data = {
    agent_id: process.env.NEXT_PUBLIC_MEBO_AGENT_ID,
    api_key: process.env.NEXT_PUBLIC_MEBO_API_KEY,
    uid: userId,
    utterance: message,
  }
  const result = await meboClient().post('', data)
  const answer = result.data.bestResponse.utterance
  return answer
}
