import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: ()=>import('@/views/HomeDashboard.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: ()=>import('@/views/CartView.vue'),
    },
    {
      path: '/shoes/:id',
      name: 'shoes',
      component: ()=>import('@/views/SingleProduct.vue'),
    },
  ],
})

export default router
