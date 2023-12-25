import { createApp } from 'vue'
import router from './router'

import { createPinia } from 'pinia'

import 'bootstrap'

import App from './App.vue'

import { setupCalendar } from 'v-calendar'

const pinia = createPinia()
const app = createApp(App)

app.use(setupCalendar, {})
app.use(router)
app.use(pinia)

app.mount('#app')
