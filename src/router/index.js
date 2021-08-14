import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/login/Admin.vue'
import Login from '../views/login/Login.vue'
import Home from '../views/home/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/logout',
    name: 'Logout'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const adminRoutes = [ 'Admin', 'Home' ]

router.beforeEach(async (to, from, next) => {
  if (store.state.user.token == undefined && localStorage.getItem('user') !== null && to.name !== 'Logout') {
    await store.dispatch('actionRestoreUser')
  }
  if ((to.name === 'Admin' || to.name === 'Login') && store.state.user.token !== undefined) {
    await store.dispatch('actionRestoreUser')
    next(store.state.admin ? '/home' : '/about')
  } else if ((to.name !== 'Login' && to.name !== 'Admin') && store.state.user.token === undefined) {
    next('/')
  } else if (to.name === 'Logout') {
    localStorage.removeItem('user')
    store.dispatch('actionRemoveUser')
    next('/')
  } else if (adminRoutes.includes(to.name) && !store.state.admin) {
    next(from)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    next()
  }
})

export default router
