<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import HelloWorld from '@/components/HelloWorld.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { demoLogin } = authStore
const { auth } = storeToRefs(authStore)
console.log(auth.value)

onMounted(() => {
  demoLogin()
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <!-- Tanstack Query Devtools -->
  <VueQueryDevtools />
</template>

<style scoped></style>
