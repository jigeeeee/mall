import Vue from "vue";
import VueRouter from "vue-router";

const home = () => import('../views/home/Home.vue')
const category = () => import('../views/category/Category')
const shopcart = () => import('../views/shopcart/Shopcart')
const profile = () => import('../views/profile/Profile')
const detial = () => import('../views/detial/Detial')

Vue.use(VueRouter)

const routes = [
  {
    //重定向
    path: '',
    redirect:'/home'
  },
  {
    path: '/home',
    // eslint-disable-next-line no-undef
    component:home
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/shopcart',
    component: shopcart
  },
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/detial/:iid',
    component: detial
  }

]

const router = new VueRouter({
  routes
})

export default router
