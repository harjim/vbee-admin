import { registerStore } from '/@/store'
import '/@/style/common.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)

app.use(router).use(createPinia())

registerStore()

app.mount('#app')
