import { isAxiosError, type AxiosRequestConfig } from 'axios'

import { axiosInstance, axiosInstanceWithToken } from '@/lib/axios-instance'

export const fetcher = async <D = unknown>(
  url: string,
  useAuth = true,
  options: AxiosRequestConfig = {}
) => {
  const instance = useAuth ? axiosInstanceWithToken : axiosInstance

  try {
    const response = await instance.get<D>(url, options)
    return response.data
  } catch (error) {
    console.error(error)

    if (isAxiosError(error)) {
      console.error(error.response?.data)
      throw new Error(error.response?.data?.message || error.message)
    }

    if (error instanceof Error) {
      console.error(error.message)
      throw error
    }

    throw new Error('An error occurred while fetching the data')
  }
}
