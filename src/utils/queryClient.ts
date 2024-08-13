import { QueryClient } from '@tanstack/vue-query'

let queryClientInstance: QueryClient | null = null

export function getQueryClient() {
  if (queryClientInstance !== null) return queryClientInstance

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {}
    }
  })

  queryClientInstance = queryClient
  return queryClient
}
