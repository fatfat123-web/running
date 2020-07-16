import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [

  {
    path: '/froth',
    name: 'froth',
    component: () => import('@/views/froth'),

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
    name: 'slideshow',
    component: () => import('@/views/slideshow'),
  },
  {
    path: '/snow',
    name: 'snow',
    component: () => import('@/views/snow'),
  },
  {
    path: '/pig',
    name: 'pig',
    component: () => import('@/views/pig'),
  },
  {
    path: '/main',
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
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
