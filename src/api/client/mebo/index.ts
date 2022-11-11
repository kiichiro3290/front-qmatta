import axios, { AxiosInstance } from 'axios'

// axiosの設定
export const client = (): AxiosInstance => {
  return axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    responseType: 'json',
  })
}

// クライアント側で叩くmeboのAPI一覧
export const meboApi = {
  getMeboMessage: async (userId: string, dialogue: string) => {
    const res = await client()
      .get('/mebo', { params: { userId, dialogue } })
      .then((res) => res.data)
    return res.answer
  },
}
