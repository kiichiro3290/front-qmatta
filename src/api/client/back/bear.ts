import qmattaClient from '..'

// クマのメッセージを取得する（簡易版のためユーザ登録なしで叩ける）: GET
// () => message: string
export const fetchQmaMessage = async (text: string, isChatGPT: boolean) => {
  const body: UserMessageToBear = { text, bot: isChatGPT }
  const res = await qmattaClient()
    .post('bear_notlogin', body)
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res
}

// クマのメッセージを取得する & メッセージをDBに保存: POST
// (userID: string, message: string) => message: string
export const postQmaMessage = async (
  text: string,
  isChatGPT: boolean
): Promise<string> => {
  const body: UserMessageToBear = { text, bot: isChatGPT }
  const res = await qmattaClient()
    .post('bear', body)
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res
}
