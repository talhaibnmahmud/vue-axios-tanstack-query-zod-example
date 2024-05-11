<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { useFetcher } from '@/composables/useFetcher'
import { useAuthStore } from '@/stores/auth'
import type { Post } from '@/schemas/post.schema'

const authStore = useAuthStore()
const { demoLogin } = authStore
const { auth } = storeToRefs(authStore)
console.log(auth.value)

const { data, error, isLoading, refetch } = useFetcher<Post[]>(['posts'], '/posts')

onMounted(() => {
  demoLogin()
})
</script>

<template>
  <main>
    <h1>Welcome to Vue 3 Vite</h1>

    <section>
      <h2>Posts</h2>

      <button @click="() => refetch" :disabled="isLoading">Refetch</button>

      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <div v-else>
        <ul>
          <li v-for="post in data" :key="post.id">
            <pre>{{ post }}</pre>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
