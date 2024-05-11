<script setup lang="ts">
import { useParsedQuery } from '@/composables/useParsedQuery'
import { postsSchema } from '@/schemas/post.schema'

const { data, error, isLoading, refetch } = useParsedQuery({
  key: ['posts'],
  url: '/posts',
  schema: postsSchema
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
