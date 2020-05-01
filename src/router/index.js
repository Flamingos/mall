import Vue from 'vue'
import VueRouter from 'vue-router'
import ShoppingMall from '@/views/home/ShoppingMall.vue'
import Register from '@/views/user/Register.vue'
import Login from '@/views/user/Login.vue'
import Goods from '@/views/items/Goods.vue'
import GoodsList from '@/views/items/GoodsList.vue'
import SearchGoodsList from '@/views/items/SearchGoodsList.vue'
import CategoryList from '@/views/items/CategoryList.vue'
import Cart from '@/views/checkout/Cart.vue'
import Main from '@/views/Main.vue'
import Member from '@/views/user/Member.vue'
import AddressList from '@/views/user/AddressList.vue'
import AddressEdit from '@/views/user/AddressEdit.vue'
import CheckOut from '@/views/checkout/CheckOut.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/goodslist',
    name: 'GoodsList',
    component: GoodsList,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/searchgoodslist',
    name: 'SearchGoodsList',
    component: SearchGoodsList,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/addresslist',
    name: 'AddressList',
    component: AddressList,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/addressedit',
    name: 'AddressEdit',
    component: AddressEdit,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/checkout',
    name: 'CheckOut',
    component: CheckOut,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [{
        path: '/mall',
        name: 'ShoppingMall',
        component: ShoppingMall,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/categorylist',
        name: 'CategoryList',
        component: CategoryList,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/member',
        name: 'Member',
        component: Member,
        meta: {
          keepAlive: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router