import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import index from '../components/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: index
  }
]

const router = new VueRouter({
  routes
})

export default router
