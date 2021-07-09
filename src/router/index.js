import Vue from "vue";
import VueRouter from "vue-router";

const home = () => import('../views/home/Home.vue')
const category = () => import('../views/category/Category')
const shopcart = () => import('../views/shopcart/Shopcart')
const profile = () => import('../views/profile/Profile')
const detail = () => import('../views/detail/Detail')

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
    path: '/detail/:iid',
    component: detail
  }

]

const router = new VueRouter({
  routes
})

export default router
