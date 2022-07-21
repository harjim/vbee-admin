import { registerStore } from '/@/store'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './style.css'

const app = createApp(App)

app.use(router).use(createPinia())

registerStore()

app.mount('#app')
