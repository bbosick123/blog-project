import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WriteView from '../views/WriteView.vue'
import ReadView from '../views/ReadView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/write', // 👈 경로 추가
      name: 'write',
      component: WriteView,
    },
    {
      path: '/post/:id', // 👈 경로 추가
      name: 'read',
      component: ReadView,
    },
  ],
})

export default router
