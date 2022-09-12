import axios from 'axios'
// import useSWR from 'swr'

const url = 'http://localhost:8888'

export const fetchQmaMessage = async () => {
  const data = await axios.get(url).then((res) => res.data)
  return data
}
