import { useMutation, type QueryKey } from '@tanstack/vue-query'
import type { AxiosRequestConfig } from 'axios'
import { z } from 'zod'

import { mutator } from '@/utils/mutator'

type FetchOptions<Z extends z.ZodTypeAny, D = any> = {
  key: QueryKey
  url: string
  body?: D
  schema?: Z
  useAuth?: boolean
  options?: AxiosRequestConfig
}

export const useParsedMutation = <D = any, Z extends z.ZodTypeAny = z.ZodNever, R = z.infer<Z>>({
  key,
  url,
  body,
  schema,
  useAuth = true,
  options = {}
}: FetchOptions<Z, D>) => {
  const mutation = useMutation<R, Error, D, [string, string, D, Z, boolean, AxiosRequestConfig]>({
    mutationKey: [key, url, body, schema, useAuth, options],
    mutationFn: (variables) => mutator<D, Z, R>({ url, body: variables, schema, useAuth, options })
  })

  return mutation
}
