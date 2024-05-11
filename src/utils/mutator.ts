import { isAxiosError, type AxiosRequestConfig } from 'axios'
import { z } from 'zod'
import { ValidationError, fromZodError } from 'zod-validation-error'

import { axiosInstance, axiosInstanceWithToken } from '@/lib/axios-instance'

type FetchOptions<Z extends z.ZodTypeAny, D = any> = {
  url: string
  body?: D
  schema?: Z
  useAuth?: boolean
  options?: AxiosRequestConfig
}

const getMutator = (method: AxiosRequestConfig['method'] = 'POST', useAuth = true) => {
  const instance = useAuth ? axiosInstanceWithToken : axiosInstance

  if (method === 'PUT') return instance.put
  if (method === 'PATCH') return instance.patch
  if (method === 'DELETE') return instance.delete

  return instance.post
}

export const mutator = async <D = any, Z extends z.ZodTypeAny = z.ZodNever, R = z.infer<Z>>({
  url,
  body,
  schema,
  useAuth = true,
  options = { method: 'POST' }
}: FetchOptions<Z, D>) => {
  const mutator = getMutator(options.method, useAuth)

  try {
    const response = await mutator<R>(url, body, options)
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
