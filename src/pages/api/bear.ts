import axios from 'axios'
// swr はデータ取得専用
// https://www.sukerou.com/2019/05/axios.html
// import useSWR from 'swr'

const url = process.env.NEXT_PUBLIC_BASE_URL ?? ''

export const fetchQmaMessage = async () => {
  const data = await axios.get(url).then((res) => res.data)
  return data
}

export const postQmaMessage = async (userId: string, message: string): Promise<string> => {
  const data = { message: message }
  const result = await axios.post(`${url}/bear/${userId}`, data)
  return result.data.response
}
