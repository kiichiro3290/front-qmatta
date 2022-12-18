import qmattaClient from '..'

// クマのメッセージを取得する（簡易版のためユーザ登録なしで叩ける）: GET
// () => message: string
export const fetchQmaMessage = async () => {
  const res = await qmattaClient()
    .get('bear_notlogin')
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res
}

// クマのメッセージを取得する & メッセージをDBに保存: POST
// (userID: string, message: string) => message: string
export const postQmaMessage = async (message: string): Promise<string> => {
  const data: UserMessageToBear = { message }
  const res = await qmattaClient()
    .post('bear', data)
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res
}
