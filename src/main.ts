import '@/styles/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from '@/App.vue'
import router from '@/router'
import { getQueryClient } from '@/utils/queryClient'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, {
  queryClient: getQueryClient()
})

app.mount('#app')
