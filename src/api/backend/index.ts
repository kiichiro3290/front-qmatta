import axios, { AxiosInstance } from 'axios'

export const meboClient = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_MEBO_URL,
    headers: {
      'Content-Type': 'application/json; multipart/form-data; text/html;',
      'X-Requested-With': 'XMLHttpRequest',
    },
    responseType: 'json',
  })
}
