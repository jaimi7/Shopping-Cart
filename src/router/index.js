import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('@/views/HomePage.vue'),
      meta: { auth: false },
    },

    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignUp.vue'),
      meta: { auth: false, header: false },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LogIn.vue'),
      meta: { header: false, auth: false },
    },

    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/ProductCart.vue'),
    },
  ],
})

export default router
