import { StorageSerializers, useStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'

import { demoUser } from '@/schemas/auth.schema'
import type { AuthType } from '@/schemas/auth.schema'

export const useAuthStore = defineStore('auth', () => {
  // const router = useRouter()

  // Retrieve the user from the localStorage when the application loads (using vueuse's useStorage)
  const auth: RemovableRef<AuthType | null> = useStorage('user', null, localStorage, {
    listenToStorageChanges: true,
    deep: true,
    writeDefaults: true,
    flush: 'sync',
    mergeDefaults: true,
    serializer: StorageSerializers.object
  })

  function register(value: AuthType) {
    auth.value = value
  }

  function login(value: AuthType) {
    auth.value = value

    // router.push('/')
  }

  function logout() {
    auth.value = null

    // router.push('/login')
  }

  function isLoggedIn() {
    return auth.value !== null
  }

  function demoToken() {
    return '257814|TzDyZhXSWS3JzxBX3pbhX8nlmeQEBrtN3wDzKXwT4f993b28'
  }

  function demoLogin() {
    auth.value = demoUser
  }

  return { auth, register, login, logout, isLoggedIn, demoToken, demoLogin }
})
