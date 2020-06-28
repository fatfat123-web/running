import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index'),

  },

  {
    path: '/froth',
    name: 'froth',
    component: () => import('@/views/froth'),

  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),

  },
  {
    path: '/rain',
    name: 'rain',
    component: () => import('@/views/rain'),

  },
  {
    path: '/tree',
    name: 'tree',
    component: () => import('@/views/tree'),

  },

]

const router = new VueRouter({
  routes
})

export default router
