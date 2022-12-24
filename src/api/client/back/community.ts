import qmattaClient from '..'

/**
 * 自分が加入しているコミュニティの一覧を取得する: GET
 * @returns { communities: Community[] }
 */
type GetCommunityListReturnValue = {
  error: boolean
  errorMessage?: string
  communityList?: Community[]
}
export const getCommunityList =
  async (): Promise<GetCommunityListReturnValue> => {
    const res = await qmattaClient()
      .get('community')
      .then((res) => {
        const returnVal = {
          error: false,
          communityList: res.data.communities,
        }
        return returnVal
      })
      .catch((e) => {
        const returnVal = {
          error: true,
          errorMessage: e.code,
        }
        return returnVal
      })

    return res
  }

/**
 * コミュニティに参加する
 * @param communityId
 * @returns { communityName: string }
 */
type RegisterCommunityType = {
  error: boolean
  errorMessage?: string
  communityName?: string
}
export const registerCommunity = async (
  communityId: string
): Promise<RegisterCommunityType> => {
  const body = { communityId: communityId }
  const res = await qmattaClient()
    .post('community', body)
    .then((res) => {
      const returnVal = {
        error: false,
        communityName: res.data.communityName,
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
 * コミュニティを作成する
 * @param communityName
 * @param icon
 * @returns { communityId: string }
 */
type CreateCommunityType = {
  error: boolean
  errorMessage?: string
  communityId?: string
}
export const createCommunity = async (
  communityName: string,
  icon: string
): Promise<CreateCommunityType> => {
  const body = { communityName: communityName, icon: icon }
  const res = await qmattaClient()
    .post('community/make', body)
    .then((res) => {
      const returnVal = {
        error: false,
        communityId: res.data.communityId,
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
 * コミュニティに参加している全ユーザを取得
 * @param communityId
 * @returns { communityName: string }
 */
type GetCommunityUsersType = {
  error: boolean
  errorMessage?: string
  users?: UserList
}
export const getCommunityUsers = async (
  communityId: string
): Promise<GetCommunityUsersType> => {
  const res = await qmattaClient()
    .get(`community/users/${communityId}`)
    .then((res) => {
      const returnVal = {
        error: false,
        users: res.data.users,
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
