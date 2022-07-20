import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NotFound from '/@/views/404.vue'

const routes:Array<RouteRecordRaw> = [
  {
    path: '/404',
    name: '404',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
