import axios from 'axios'

import type { AxiosInstance } from 'axios'

export const qmattaClient = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  })
}
