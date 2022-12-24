import qmattaClient from '..'

/**
 * クマのメッセージを取得する：ログインしてないバージョン:POST
 * chatGPTでモヤモヤが溜まったら使う
 * @param text
 * @param score
 * @returns { response: string }
 */
type GetQmaReplyNotLoginType = {
  error: boolean
  errorMessage?: string
  response?: string
}
export const getQmaReplyNotLogin = async (
  text: string,
  score: number
): Promise<GetQmaReplyNotLoginType> => {
  const body = { text: text, score: score }
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
 * クマのメッセージを取得する & モヤモヤを溜める:ログインしてないバージョン：POST
 * ユーザのモヤモヤを溜める
 * @param text
 * @returns { negPharese: string, response: string }
 */
type GetQmaReplyAndMoyaNotLoginType = {
  error: boolean
  errorMessage?: string
  response?: string
  negPhrase?: string[]
  score?: number
}
export const getQmaReplyAndMoyaNotLogin = async (
  text: string
): Promise<GetQmaReplyAndMoyaNotLoginType> => {
  const body = { text }
  const res = await qmattaClient()
    .post('bear-notlogin/sentiment', body)
    .then((res) => {
      const returnVal = {
        error: false,
        response: res.data.response,
        negPhrase: res.data.negPharese,
        score: res.data.score,
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
 * クマのメッセージを取得する：ログインバージョン：POST
 * chatGPTの返答で，モヤモヤが溜まったら使う
 */
type GetQmaReplyType = {
  error: boolean
  errorMessage?: string
  response?: string
}
export const getQmaReply = async (
  text: string,
  score: number
): Promise<GetQmaReplyType> => {
  const body = { text: text, score: score }
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
 * クマのメッセージ & モヤモヤを取得する：ログインバージョン:POST
 * ユーザのモヤモヤを溜める
 */
type GetQmaReplyAndMoyaType = {
  error: boolean
  errorMessage?: string
  response?: string
  negPhrase?: string[]
  score?: number
}
export const getQmaReplyAndMoya = async (
  text: string
): Promise<GetQmaReplyAndMoyaType> => {
  const body = { text }
  const res = await qmattaClient()
    .post('bear/sentiment', body)
    .then((res) => {
      const returnVal = {
        error: false,
        response: res.data.response,
        negPhrase: res.data.negPhrase,
        score: res.data.score,
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
