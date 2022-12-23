import qmattaClient from '..'

/**
 * クマのメッセージを取得する（簡易版のためユーザ登録なしで叩ける）: GET
 * @param text
 * @param isChatGPT
 * @returns { response: string }
 */
type FetchQmaMessageType = {
  error: boolean
  errorMessage?: string
  response?: string
}
export const fetchQmaMessage = async (
  text: string,
  isChatGPT: boolean
): Promise<FetchQmaMessageType> => {
  const body: UserMessageToBear = { text, bot: isChatGPT }
  const res = await qmattaClient()
    .post('bear-notlogin', body)
    .then((res) => {
      const returnVal = {
        error: false,
        response: res.data.response,
      }
      return returnVal
    })
    .catch((e) => {
      const res = {
        error: true,
        errorMessage: e.code,
      }
      return res
    })
  return res
}

/**
 * クマのメッセージを取得する & メッセージをDBに保存: POST
 * @param text
 * @param isChatGPT
 * @returns { response: string }
 */
type PostQmaMessageType = {
  error: boolean
  errorMessage?: string
  response?: string
}
export const postQmaMessage = async (
  text: string,
  isChatGPT: boolean
): Promise<PostQmaMessageType> => {
  const body: UserMessageToBear = { text, bot: isChatGPT }
  const res = await qmattaClient()
    .post('bear', body)
    .then((res) => {
      const returnVal = {
        error: false,
        response: res.data.response,
      }
      return returnVal
    })
    .catch((e) => {
      const res = {
        error: true,
        errorMessage: e.code,
      }
      return res
    })
  return res
}

/**
 * メッセージの送信履歴を取得する：GET
 * @returns { chatHistory: ChatHistory }
 */
type GetChatHistoryType = {
  error: boolean
  errorMessage?: string
  histories?: ChatHistory
}
export const getChatHistory = async (): Promise<GetChatHistoryType> => {
  const res = await qmattaClient()
    .get('bear/history')
    .then((res) => {
      const returnVal = {
        error: false,
        histories: res.data.histories,
      }
      return returnVal
    })
    .catch((e) => {
      const res = {
        error: true,
        errorMessage: e.code,
      }
      return res
    })

  return res
}
