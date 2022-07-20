import dayjs from '/@/common/dayjs'
import { registerStore } from '/@/store'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)

app.use(router).use(createPinia()).use(dayjs)

registerStore()

app.mount('#app')
