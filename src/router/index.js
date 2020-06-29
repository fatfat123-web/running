import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'index',
  //   component: () => import('@/views/index'),
  //
  // },

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
  {
    path: '/',
    component: () => import('@/views/new/main'),
    children: [
      {
        path: '/one',
        component: () => import('@/views/new/one')
      },
      {
        path: '/two',
        component: () => import('@/views/new/two')
      },
      {
        path: '/three',
        component: () => import('@/views/new/three')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
