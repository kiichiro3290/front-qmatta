import axios from 'axios'
import useSWR from 'swr'

const url = 'http://localhost:8888'
const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const useFetchQmaMessage = () => {
  const { data, error } = useSWR(url, fetcher)
  return { data, error }
}
