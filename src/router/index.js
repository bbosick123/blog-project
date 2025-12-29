import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WriteView from '../views/WriteView.vue'
import ReadView from '../views/ReadView.vue'
import EditView from '../views/EditView.vue'

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

    {
      path: '/post/:id/edit', // 상세 페이지 뒤에 /edit을 붙이는 실무 관례
      name: 'edit',
      component: EditView,
    },
  ],
})

export default router
