import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '../views/RegisterForm.vue';
import HomeView from '../views/HomeView.vue';
import LoginForm from '../views/LoginForm.vue';
import ConfirmateCodeAuth from '../views/ConfirmateCodeAuth.vue';
import Dashboard from '../views/Dashboard.vue';
import Sucursales from '../views/Sucursales.vue';

//import store from '@/store';
import VueJwtDecode from 'vue-jwt-decode';
import Cookies from 'js-cookie';

const routes = [
  {
    path: '/',
    name: 'index',
    component: LoginForm
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm
  },
  {
    path: '/confirmatecode',
    name: 'ConfirmateCode',
    component: ConfirmateCodeAuth,
    meta: { requiresLogin: true }
  },
  {
    path: '/SucursalesDash',
    name: 'SucursalesDash',
    component: Sucursales,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach(async (to) => {
  // const token = localStorage.getItem('token') ?? null;

  if (to.meta.requiresAuth === true) {
    
    const token = Cookies.get('token') ?? null;
    console.log('token', token);
    const decoded = token !== null ? VueJwtDecode.decode(token) : { is_auth: false };
    console.log('decoded', decoded);
    if (token === null || !decoded.is_auth ) {
      return { name: 'Login' };
    } 
    // else {
    //   const path = to.path;
    //   console.log('path', path);
    //   return { path };
    // }
  } 

  if (to.meta.requiresLogin === true) {
    const token = Cookies.get('token') ?? null;
    if (!token) {
      return { name: 'Login' };
    } 
    // else {
    //   const path = to.path;
    //   console.log('path', path);
    //   return { path };
    // }
  }
});


export default router;
