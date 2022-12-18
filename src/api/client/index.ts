import axios from 'axios'

import type { AxiosInstance } from 'axios'

const qmattaClient = (): AxiosInstance => {
  const token = localStorage.getItem('token')
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
      // 'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
    // responseType: 'json',
    // withCredentials: true, // cookieのレスポンスをバックエンドから受け取るため
  })
}

export default qmattaClient
