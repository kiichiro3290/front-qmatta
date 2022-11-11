// クマのメッセージを取得する（簡易版）: GET

import { qmattaClient } from '.'

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
