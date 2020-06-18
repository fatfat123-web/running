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
    path: '/fclick',
    name: 'fclick',
    component: () => import('@/views/fclick'),

  },
  {
    path: '/hb',
    name: 'hb',
    component: () => import('@/views/hb'),

  },


]

const router = new VueRouter({
  routes
})

export default router
