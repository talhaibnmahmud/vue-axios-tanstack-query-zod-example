<script setup lang="ts">
import { useParsedMutation } from '@/composables/useParsedMutation'
import { postSchema, postsSchema, type Post } from '@/schemas/post.schema'
import { fetcher } from '@/utils/fetcher'
import { useQuery } from '@tanstack/vue-query'
import type { z } from 'zod'

// const { data, error, isLoading, refetch } = useParsedQuery({
//   queryOptions: { queryKey: ['posts'] },
//   key: ['posts'],
//   url: '/posts',
//   schema: postsSchema
// })

const key = 'posts'
const url = '/posts'
const schema = postsSchema
type Z = z.infer<typeof postsSchema>

const { data, error, isLoading, refetch } = useQuery<Z>({
  queryKey: [key, url, schema],
  queryFn: () => fetcher({ url, schema })
})

const newPost: Post = {
  id: 101,
  title: 'foo',
  body: 'bar',
  userId: 1
}

const mutation = useParsedMutation<Post, typeof postSchema>({
  key: ['post'],
  schema: postSchema
})

const addPost = async () => {
  await mutation.mutateAsync({ url: '/posts', body: newPost })
  refetch()
}

const putMutation = useParsedMutation<Post, typeof postSchema>({
  key: ['put'],
  schema: postSchema,
  useAuth: true,
  options: {
    method: 'PUT'
  }
})

const putPost = async () => {
  await putMutation.mutateAsync({ url: '/posts/1', body: newPost })
  refetch()
}

const patchMutation = useParsedMutation<Partial<Post>, typeof postSchema>({
  key: ['patch'],
  schema: postSchema,
  useAuth: true,
  options: {
    method: 'PATCH',
    headers: {
      'X-Custom-Header': 'foobar'
    }
  }
})
const patchPost = async (postId: number) => {
  await patchMutation.mutateAsync({ url: `/posts/${postId}`, body: { title: 'foo' } })
  refetch()
}

const deleteMutation = useParsedMutation({
  key: ['delete'],
  useAuth: true,
  options: {
    method: 'DELETE',
    headers: {
      'X-Custom-Header': 'foobar'
    }
  }
})
const deletePost = async (postId: number) => {
  await deleteMutation.mutateAsync({ url: `/posts/${postId}` })
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
          @click="() => patchPost(Math.floor(Math.random() * 100) + 1)"
          :disabled="patchMutation.isPending.value"
          class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Patch Post
        </button>
        <button
          @click="() => deletePost(Math.floor(Math.random() * 100) + 1)"
          :disabled="deleteMutation.isPending.value"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Post
        </button>
      </div>

      <div v-if="isLoading">Loading...</div>
      <pre v-else-if="error">Error: {{ error }}</pre>
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
