import qmattaClient from '..'

type Community = {
  hogehoeg: string
}

/**
 * TODO コミュニティの作成
 * @param data
 * @returns
 */
export const createCommunity = async (data: Community): Promise<string> => {
  const res = await qmattaClient()
    .post('community', data)
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res.communityId
}
