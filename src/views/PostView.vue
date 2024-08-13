<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import type { z } from 'zod'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { postSchema } from '@/schemas/post.schema'
import { fetcher } from '@/utils/fetcher'
import { getQueryClient } from '@/utils/queryClient'

const {
  currentRoute: {
    value: { params }
  }
} = useRouter()
console.log('Wrong ID: ', params.wrong_id)

const id = ref(params.wrong_id)
const url = computed(() => `/posts/${id.value}`)

const key = 'posts'
const schema = postSchema
type Z = z.infer<typeof postSchema>

const queryClient = getQueryClient()
const { data, error, isLoading, refetch } = useQuery<Z>(
  {
    queryKey: [key, url.value, schema],
    queryFn: () => fetcher({ url: url.value, schema }),
    enabled: !!id.value,
    staleTime: 10_000
  },
  getQueryClient()
)
watch(url, () => {
  console.log('URL: ', url.value)
  refetch()
})

const timerRef = ref(0)
onMounted(() => {
  timerRef.value = window.setTimeout(() => {
    id.value = params.id
  }, 10_000)
})

onBeforeUnmount(() => {
  if (!timerRef.value) return

  window.clearTimeout(timerRef.value)
})
</script>

<template>
  <div class="text-center max-w-xl mx-auto">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <pre v-else-if="data">{{ data }}</pre>
    <div v-else>Not found</div>
    <button @click="() => refetch()">Refetch</button>

    <button @click="queryClient.clear">Clear Cache</button>
  </div>
</template>
