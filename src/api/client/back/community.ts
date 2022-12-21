import qmattaClient from '..'

/**
 * 自分が加入しているコミュニティの一覧を取得する: GET
 * @returns string[]
 */
type GetCommunityListReturnValue = {
  error: boolean
  errorMessage?: string
  communities?: Community[]
}
export const getCommunityList =
  async (): Promise<GetCommunityListReturnValue> => {
    const res = await qmattaClient()
      .get('community')
      .then((res) => res.data)
      .catch((e) => {
        const returnVal = {
          error: true,
          errorMessage: e.code,
        }
        return returnVal
      })

    const returnVal = {
      error: false,
      communities: res.communities,
    }
    return returnVal
  }

/**
 * コミュニティに参加する
 * @param communityId
 * @returns
 */
export const registerCommunity = async (communityId: string) => {
  const body = { communityId: communityId }
  const res = await qmattaClient()
    .post('community', body)
    .then((res) => res.data)
    .catch(() => {
      return 'error'
    })
  return res.communityName
}

/**
 * コミュニティを作成する
 * @param communityName
 * @param icon
 * @returns
 */
export const createCommunity = async (
  communityName: string,
  icon: string[]
) => {
  const body = { communityName: communityName, icon: icon }
  const res = await qmattaClient()
    .post('community/make', body)
    .then((res) => res.data)
    .catch(() => {
      return 'error'
    })
  return res.communityId
}
