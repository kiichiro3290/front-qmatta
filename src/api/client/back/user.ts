import qmattaClient from '..'

/**
 * ユーザの新規登録：POST
 * @param emailAddress
 * @param password
 * @returns
 */
export const signUpUser = async (emailAddress: string, password: string) => {
  const body = {
    emailAddress,
    password,
  }
  const res = await qmattaClient()
    .post('signup', body)
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return { msg: res.msg, result: res.result }
}

/**
 * ログイン処理
 * @param emailAddress
 * @param password
 * @returns { code: string, token: string, expire: string}
 */
export const logInUser = async (emailAddress: string, password: string) => {
  const body = {
    emailAddress,
    password,
  }

  const res = await qmattaClient()
    .post('login', body, {
      withCredentials: true,
    })
    .then((res) => res.data)

  return {
    code: res.code,
    token: res.token,
    expire: res.expire,
  }
}

/**
 * ユーザの情報を取得する
 * @returns { userName: string, profile: string, status: string}
 */
export const getUserInfo = async () => {
  const res = await qmattaClient()
    .get('user')
    .then((res) => res.data)
  return res
}
/**
 * メッセージの送信履歴を取得する：GET
 * @returns string[]
 */
export const getMessageHistory = async (): Promise<MessageHistory> => {
  const res = await qmattaClient()
    .get('bear/history')
    .then((res) => res.data)

  // 時間を日付型に変更する
  // const dates = res.map((raw: string) => {
  //   return new Date(raw)
  // })

  return res.histories
}

/**
 * ユーザがスタンプを押した時に，ユーザのステータスを更新する: PATCH
 * @param stampId
 * @returns { isUpdated: boolean }
 */
export const updateUserStatus = async (stampId: string): Promise<boolean> => {
  const data = { stampId }
  const res = await qmattaClient()
    .patch('user/status', data)
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res
}

/**
 * ユーザのアカウント情報を取得する：GET
 * バイト列が返ってくる
 * @returns byte[]
 */
export const getUserIcons = async () => {
  const res = await qmattaClient()
    .get('user/icon')
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res
}

/**
 * 自分が加入しているコミュニティの一覧を取得する: GET
 * @returns string[]
 */
export const getCommunityList = async (): Promise<string[]> => {
  const res = await qmattaClient()
    .get('user/community')
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res.communities
}
