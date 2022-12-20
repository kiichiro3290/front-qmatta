import qmattaClient from '..'

/**
 * 自分が加入しているコミュニティの一覧を取得する: GET
 * @returns string[]
 */
export const getCommunityList = async (): Promise<string[]> => {
  const res = await qmattaClient()
    .get('community')
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res.communities
}

/**
 * コミュニティに参加する
 * @param communityId
 * @returns
 */
export const enterCommunity = async (communityId: string) => {
  const body = { communityId }
  const res = await qmattaClient()
    .post('community', body)
    .then((res) => res.data)
    .catch((e) => console.log(e))
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
    .catch((e) => console.log(e))
  return res.communityId
}
