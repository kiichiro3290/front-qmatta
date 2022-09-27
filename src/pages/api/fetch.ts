import axios from 'axios'
// import useSWR from 'swr'

const url = 'http://localhost:8080'

export const fetchQmaMessage = async () => {
  const data = await axios.get(url).then((res) => res.data)
  return data
}

export const postQmaMessage = async (userId: string, message: string): Promise<string> => {
  const data = { message: message }
  const result = await axios.post(`${url}/bear/${userId}`, data)
  return result.data.response
}
