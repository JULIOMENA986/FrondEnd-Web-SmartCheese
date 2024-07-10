import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '../views/RegisterForm.vue';
import HomeView from '../views/HomeView.vue';
import LoginForm from '../views/LoginForm.vue';
import ConfirmateCodeAuth from '../views/ConfirmateCodeAuth.vue';
import Dashboard from '../views/Dashboard.vue';
import Sucursales from '../views/Sucursales.vue';

//import store from '@/store';
import VueJwtDecode from 'vue-jwt-decode';

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


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') ?? null;
  const decoded = token ? VueJwtDecode.decode(token) : { is_auth: false };
  console.log('decoded', decoded);

  if (next.meta.requiresAuth === true) {
    if (!decoded.is_auth) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } 

  if (next.meta.requiresLogin === true) {
    if (!token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  }
});


export default router;
