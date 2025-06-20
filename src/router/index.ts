import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/custom-card',
      name: 'custom-card',
      component: () => import('../views/CustomCardView.vue'),
    },
  ],
})

export default router
