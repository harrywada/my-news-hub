import Vue from 'vue'
import VueRouter from 'vue-router'

import FeedList from '@/views/FeedList'
import FeedDisplay from '@/views/FeedDisplay'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: FeedList,
  },
  {
    path: '/display',
    name: 'display',
    props: route => ({
      url: Array.isArray(route.query.url) ? route.query.url[0] : route.query.url,
    }),
    component: FeedDisplay,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
