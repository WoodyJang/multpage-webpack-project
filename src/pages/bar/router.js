import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/baz',
    name: 'baz',
    component: () => import('./baz')
  }
]
const router = new Router({
  mode: 'history',
  base: '/bar',
  routes
})

export default router