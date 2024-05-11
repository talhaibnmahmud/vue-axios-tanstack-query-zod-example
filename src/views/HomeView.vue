<script setup lang="ts">
import { useParsedMutation } from '@/composables/useParsedMutation'
import { useParsedQuery } from '@/composables/useParsedQuery'
import { postsSchema, postSchema, type Post } from '@/schemas/post.schema'

const { data, error, isLoading, refetch } = useParsedQuery({
  key: ['posts'],
  url: '/posts',
  schema: postsSchema
})

const newPost: Post = {
  id: 101,
  title: 'foo',
  body: 'bar',
  userId: 1
}

const mutation = useParsedMutation<Post, typeof postSchema>({
  key: ['post'],
  url: '/posts',
  schema: postSchema
})

const addPost = async () => {
  await mutation.mutateAsync(newPost)
  refetch()
}

const putMutation = useParsedMutation<Post, typeof postSchema>({
  key: ['put'],
  url: '/posts/1',
  schema: postSchema,
  useAuth: true,
  options: {
    method: 'PUT'
  }
})

const putPost = async () => {
  await putMutation.mutateAsync(newPost)
  refetch()
}

const patchMutation = useParsedMutation<Partial<Post>, typeof postSchema>({
  key: ['patch'],
  url: '/posts/1',
  schema: postSchema,
  useAuth: true,
  options: {
    method: 'PATCH'
  }
})
const patchPost = async () => {
  await patchMutation.mutateAsync({ title: 'foo' })
  refetch()
}
</script>

<template>
  <main>
    <h1>Welcome to Vue 3 Vite</h1>

    <section>
      <h2>Posts</h2>

      <div class="flex gap-4" v-if="!isLoading">
        <button
          @click="() => refetch()"
          :disabled="isLoading"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Refetch
        </button>
        <button
          @click="addPost"
          :disabled="mutation.isPending.value"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Post
        </button>
        <button
          @click="putPost"
          :disabled="putMutation.isPending.value"
          class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Put Post
        </button>
        <button
          @click="patchPost"
          :disabled="patchMutation.isPending.value"
          class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Patch Post
        </button>
      </div>

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
