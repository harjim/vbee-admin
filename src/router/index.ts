import basicRoute from '/@/router/routes/basicRoute'
import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: basicRoute
})

router.beforeEach((to, from, next) => {
  NProgress.configure({ showSpinner: false })
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
