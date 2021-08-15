import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/login/Admin.vue'
import Login from '../views/login/Login.vue'
import AdminHome from '../views/home/AdminHome.vue'
import Home from '../views/home/Home.vue'
import Codes from '../views/codes/Codes.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Resgatar Código',
    component: Home
  },
  {
    path: '/codes',
    name: 'Códigos Resgatados',
    component: Codes
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/admin/home',
    name: 'Clientes',
    component: AdminHome
  },
  {
    path: '/logout',
    name: 'Logout'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const adminRoutes = [ 'Admin', 'Clientes' ]

router.beforeEach(async (to, from, next) => {
  if (store.state.user.token == undefined && localStorage.getItem('user') !== null && to.name !== 'Logout') {
    await store.dispatch('actionRestoreUser')
  }
  if ((to.name === 'Admin' || to.name === 'Login') && store.state.user.token !== undefined) {
    await store.dispatch('actionRestoreUser')
    next(store.state.admin ? '/admin/home' : '/home')
  } else if ((to.name !== 'Login' && to.name !== 'Admin') && store.state.user.token === undefined) {
    next('/')
  } else if (to.name === 'Logout') {
    localStorage.removeItem('user')
    store.dispatch('actionRemoveUser')
    next('/')
  } else if (adminRoutes.includes(to.name) && !store.state.admin && store.state.user.token !== undefined) {
    next(from)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    next()
  }
})

export default router
