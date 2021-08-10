import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/components/auth/Login'
import CustomersImport from '@/views/customer/CustomersImport'
import Customers from '@/views/customer/Customers'



const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem('access_token')) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('access_token')) {
    next()
    return
  }
  next('/login')
}

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated,

  },

  {
    path: '/customer/import',
    name: 'CustomersImport',
    component: CustomersImport,
    beforeEnter: ifAuthenticated,
  },

  {
    path: '/customers',
    name: 'Customers',
    component: Customers,
    beforeEnter: ifAuthenticated,
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated,
  },

  { path: '*', redirect: '/', beforeEnter: ifAuthenticated, }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
