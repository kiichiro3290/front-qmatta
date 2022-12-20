import qmattaClient from '..'

// クマのメッセージを取得する（簡易版のためユーザ登録なしで叩ける）: GET
// () => message: string
export const fetchQmaMessage = async (text: string, isChatGPT: boolean) => {
  const body: UserMessageToBear = { text, bot: isChatGPT }
  const res = await qmattaClient()
    .post('bear-notlogin', body)
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res.response
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
  return res.response
}

/**
 * メッセージの送信履歴を取得する：GET
 * @returns string[]
 */
export const getMessageHistory = async (): Promise<MessageHistory[]> => {
  const res = await qmattaClient()
    .get('bear/history')
    .then((res) => res.data)
    .catch((e) => console.log(e))

  // 時間を日付型に変更する
  // const dates = res.map((raw: string) => {
  //   return new Date(raw)
  // })

  return res.histories
}
