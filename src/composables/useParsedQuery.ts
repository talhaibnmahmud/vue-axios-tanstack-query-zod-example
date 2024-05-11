import { useQuery, type QueryKey } from '@tanstack/vue-query'
import type { AxiosRequestConfig } from 'axios'
import { z } from 'zod'

import { fetcher } from '@/utils/fetcher'

type FetchOptions<Z extends z.ZodTypeAny> = {
  key: QueryKey
  url: string
  schema?: Z
  useAuth?: boolean
  options?: AxiosRequestConfig
}

export const useParsedQuery = <Z extends z.ZodTypeAny = z.ZodNever, D = z.infer<Z>>({
  key,
  url,
  schema,
  useAuth = true,
  options = {}
}: FetchOptions<Z>) => {
  const query = useQuery<D, Error>({
    queryKey: [key, url, schema, useAuth, options],
    queryFn: () => fetcher<Z>({ url, schema, useAuth, options })
  })

  return query
}

// type Opts<Z extends z.ZodTypeAny> = {
//   // ...other db opts
//   schema?: Z
// }
// export const findOne = async <Z extends z.ZodTypeAny = z.ZodNever>(opts: Opts<Z>) => {
//   return 'whatever' as z.infer<Z>
// }

// const User = z.object({
//   id: z.string(),
//   username: z.string(),
//   createdAt: z.string()
// })

// const someOtherWrapper = async <Z extends z.ZodTypeAny = z.ZodNever>({ schema }: { schema: Z }) => {
//   // expect user to be of type `typeof User`
//   const user = await findOne({ schema })
//   return user
// }

// // expect user to be of type `typeof User`
// const user = await someOtherWrapper({ schema: User })
