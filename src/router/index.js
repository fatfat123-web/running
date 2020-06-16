import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index'),

  },
  {
    path: '/',
    name: 'fclick',
    component: () => import('@/views/fclick'),

  },


]

const router = new VueRouter({
  routes
})

export default router
