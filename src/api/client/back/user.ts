import qmattaClient from '..'

/**
 * ユーザの新規登録：POST
 * @param emailAddress
 * @param password
 * @returns { message: string }
 */
type SignUpUser = {
  error: boolean
  errorMessage?: string
  message?: string
  code?: string
}
export const signUpUser = async (
  emailAddress: string,
  password: string
): Promise<SignUpUser> => {
  const body = {
    emailAddress,
    password,
  }

  const res = await qmattaClient()
    .post('signup', body)
    .then((res) => {
      if (res.data.result) {
        const returnVal = {
          error: false,
          message: res.data.msg,
        }
        return returnVal
      } else {
        const returnVal = {
          error: true,
          errorMessage: res.data.msg,
        }
        return returnVal
      }
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
 * ログイン処理
 * @param emailAddress
 * @param password
 * @returns { code: string, token: string, expire: string }
 */
type LogInUserType = {
  error: boolean
  errorMessage?: string
  code?: string
  token?: string
  expire?: string
}
export const logInUser = async (
  emailAddress: string,
  password: string
): Promise<LogInUserType> => {
  const body = {
    emailAddress,
    password,
  }

  const res = await qmattaClient()
    .post('login', body, {
      withCredentials: true,
    })
    .then((res) => {
      const returnVal = {
        error: false,
        code: res.data.code,
        token: res.data.token,
        expire: res.data.expire,
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
 * ユーザの情報を取得する
 * @returns { userName: string, profile: string, status: string}
 */
type GetUserInfoType = {
  error: boolean
  errorMessage?: string
  userName?: string
  profile?: string
  status?: string
}
export const getUserInfo = async (): Promise<GetUserInfoType> => {
  const res = await qmattaClient()
    .get('user')
    .then((res) => {
      const returnVal = {
        error: false,
        userName: res.data.userName,
        profile: res.data.profile,
        status: res.data.status,
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
 * ユーザがスタンプを押した時に，ユーザのステータスを更新する: PATCH
 * @param stampId
 * @returns { isUpdated: boolean }
 */
type UpdateUserStatusType = {
  error: boolean
  errorMessage?: string
  isUpdated?: boolean
}
export const updateUserStatus = async (
  stampId: string
): Promise<UpdateUserStatusType> => {
  const data = { stampId }
  const res = await qmattaClient()
    .patch('user/status', data)
    .then((res) => {
      const returnVal = {
        error: false,
        isUpdated: res.data.isUpdated,
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
 * ユーザのアカウント情報を取得する：GET
 * バイト列が返ってくる
 * @returns { icon: byte[] }
 */
type GetUserIconsType = {
  error: boolean
  errorMessage?: string
  userIcon?: string
}
export const getUserIcon = async (): Promise<GetUserIconsType> => {
  const res = await qmattaClient()
    .get('user/icon')
    .then((res) => {
      const returnVal = {
        error: false,
        userIcon: 'data:image/png;base64,' + res.data.userIcon,
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
