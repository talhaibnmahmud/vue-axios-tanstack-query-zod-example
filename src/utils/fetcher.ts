import { isAxiosError, type AxiosRequestConfig } from 'axios'
import { z } from 'zod'

import { axiosInstance, axiosInstanceWithToken } from '@/lib/axios-instance'
import { ValidationError, fromZodError } from 'zod-validation-error'

type FetchOptions<Z extends z.ZodTypeAny> = {
  url: string
  schema?: Z
  useAuth?: boolean
  options?: AxiosRequestConfig
}

export const fetcher = async <Z extends z.ZodTypeAny = z.ZodNever, D = z.infer<Z>>({
  url,
  schema,
  useAuth = true,
  options = {}
}: FetchOptions<Z>) => {
  const instance = useAuth ? axiosInstanceWithToken : axiosInstance

  try {
    const response = await instance.get<D>(url, options)
    if (!schema) return response.data

    const data = schema.parse(response.data)
    return data as z.infer<Z>
  } catch (error) {
    console.error(error)

    if (isAxiosError(error)) {
      console.error(error.response?.data)
      throw new Error(error.response?.data?.message || error.message)
    }

    // If the error is an instance of ZodError, it means the data is invalid
    if (error instanceof z.ZodError) {
      console.error(error.errors)
      throw import.meta.env.DEV
        ? fromZodError(error)
        : new ValidationError('An error occurred while validating the data')
    }

    if (error instanceof Error) {
      console.error(error.message)
      throw error
    }

    throw new Error('An error occurred while fetching the data')
  }
}
