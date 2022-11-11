// meboのapiを叩いて，返答を取得する
// 無料版で800messages/month, ¥2800/monthで10000messages/month

import { meboClient } from '..'

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
