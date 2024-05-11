import { useQuery, type QueryKey } from '@tanstack/vue-query'
import type { AxiosRequestConfig } from 'axios'

import { fetcher } from '@/utils/fetcher'

export const useFetcher = <D>(
  key: QueryKey,
  url: string,
  useAuth = true,
  options: AxiosRequestConfig = {}
) => {
  const query = useQuery<D, Error>({
    queryKey: [key, url, useAuth, options],
    queryFn: () => fetcher<D>(url, useAuth, options)
  })

  return query
}
