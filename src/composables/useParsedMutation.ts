import { useMutation, type QueryKey } from '@tanstack/vue-query'
import type { AxiosRequestConfig } from 'axios'
import { z } from 'zod'

import { mutator } from '@/utils/mutator'

type MutationOptions<Z extends z.ZodTypeAny> = {
  key: QueryKey
  schema?: Z
  useAuth?: boolean
  options?: AxiosRequestConfig
}

type TVariables<TBody> = { url: string; body?: TBody }

export const useParsedMutation = <
  TBody = void,
  Z extends z.ZodTypeAny = z.ZodNever,
  TData = z.infer<Z>
>({
  key,
  schema,
  useAuth = true,
  options = { method: 'POST' }
}: MutationOptions<Z>) => {
  const mutation = useMutation<
    TData,
    Error,
    TVariables<TBody>
    // { key: QueryKey; url: string; body: TVariables; schema?: Z; useAuth?: boolean; options?: AxiosRequestConfig }
  >({
    mutationKey: [key, schema, useAuth, options],
    mutationFn: (variables) =>
      mutator<TBody, Z, TData>({
        url: variables.url,
        body: variables.body,
        schema,
        useAuth,
        options
      })
  })

  return mutation
}
