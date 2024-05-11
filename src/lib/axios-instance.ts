import axios from 'axios'

import { useAuthStore } from '@/stores/auth'
import { env } from '@/utils/env'

export const axiosInstance = axios.create({
  baseURL: env.VITE_BASE_URL,
  timeout: 5000
})

export const axiosInstanceWithToken = axios.create({
  baseURL: env.VITE_BASE_URL,
  timeout: 5000
})
// Axios instance with token
axiosInstanceWithToken.interceptors.request.use(
  (config) => {
    const token = useAuthStore().auth?.token
    if (!token) throw new Error('You are not logged in!')

    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
