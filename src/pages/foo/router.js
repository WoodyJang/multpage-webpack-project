import Vue from 'vue'
import Router from 'vue-router'
import baz from './baz'

Vue.use(Router)

const routes = [
  {
    path: '/baz',
    name: 'baz',
    component: baz
  }
]
const router = new Router({
  mode: 'history',
  base: '/foo',
  routes
})

export default router