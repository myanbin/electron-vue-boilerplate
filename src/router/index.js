import Vue from 'vue'
import VueRouter from 'vue-router'
import Library from '../views/Library.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Library',
    component: Library
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (settings.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
  },
  {
    path: '/photo/:uuid',
    name: 'Photo',
    component: () => import(/* webpackChunkName: "photo" */ '../views/Photo.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
