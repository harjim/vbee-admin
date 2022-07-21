import { loadLang } from '/@/lang'
import { registerStore } from '/@/store'
import '/@/style/common.scss'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)

app.use(router).use(createPinia())

// 总线注册 store
registerStore()

const i18n = await loadLang(app)
app.use(ElementPlus, { i18n: i18n.global.t })

app.mount('#app')
