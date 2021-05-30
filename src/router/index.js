import Vue from 'vue'
import VueRouter from 'vue-router'
import Library from '../views/Library.vue'
import People from '../views/People.vue'
import Photos from '../views/Photos.vue'
import Location from '../views/Location.vue'
import Favorites from '../views/Favorites.vue'
import Settings from '../views/Settings.vue'
import Photo from '../views/Photo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Library,
    children: [
      {
        path: '',
        component: Photos,
        meta: { title: '照片库' }
      },
      {
        path: 'people',
        component: People,
        meta: { title: '人物' }
      },
      {
        path: 'location',
        component: Location,
        meta: { title: '位置' }
      },
      {
        path: 'favorites',
        component: Favorites,
        meta: { title: '收藏' }
      }
    ]
  },
  {
    path: '/settings',
    component: Settings
  },
  {
    path: '/view/:id',
    component: Photo
  }
]

const router = new VueRouter({
  routes
})

export default router
