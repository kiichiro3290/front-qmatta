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

// meboのapiを叩いて，返答を取得する
// 無料版で800messages/month, ¥2800/monthで10000messages/month
// (userID: string, message: string) => message: string
export const postQmaMessage = async (userId: string, message: string): Promise<string> => {
  const data = {
    agent_id: '6804034f-7bf4-4291-9c1d-b3e786887ae41839c82164f1a9',
    api_key: '64d60c35-9735-442b-8579-f50443c4aa031839ca21cb5e5',
    uid: userId,
    utterance: message,
  }
  const result = await axios.post('https://api-mebo.dev/api', data)
  const answer = result.data.bestResponse.utterance ?? 'よくわからないかも'
  return answer
}
