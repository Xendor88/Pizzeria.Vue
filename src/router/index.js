import Vue from 'vue'
import VueRouter from 'vue-router'
import Pizzas from '../views/Pizzas.vue'
import guard from '../userLib/guardservice'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pizzas',
    component: Pizzas,
    
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ingredients.vue'),
    meta: {
      role: 'admin'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to, from, next) => {
  const {role} = to.meta || {}; 
  const autorized =await guard(role)
  if(!autorized) next({name:'Login'})
  else next();
})

export default router
