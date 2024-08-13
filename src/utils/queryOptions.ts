import { queryOptions, type QueryKey, type UseQueryOptions } from '@tanstack/vue-query'
import type { AxiosRequestConfig } from 'axios'
import type { z } from 'zod'

import { fetcher } from '@/utils/fetcher'

type FetchOptions<Z extends z.ZodTypeAny> = {
  url: string
  key: QueryKey
  queryOptions: UseQueryOptions<z.infer<Z>, Error>
  schema?: Z
  useAuth?: boolean
  options?: AxiosRequestConfig
}

export const groupQueryOptions = <Z extends z.ZodTypeAny = z.ZodNever>({
  url,
  key,
  schema,
  useAuth,
  options
}: FetchOptions<Z>) => {
  return queryOptions({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [...key, url, schema, useAuth, options].filter(Boolean),
    queryFn: () =>
      fetcher<Z>({
        url,
        ...(schema ? { schema } : {}),
        ...(useAuth ? { useAuth } : {}),
        ...(options || {})
      })
  })
}
