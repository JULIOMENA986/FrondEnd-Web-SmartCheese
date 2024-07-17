import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '../views/RegisterForm.vue';
import HomeView from '../views/HomeView.vue';
import LoginForm from '../views/LoginForm.vue';
import ConfirmateCodeAuth from '../views/ConfirmateCodeAuth.vue';
import Dashboard from '../views/Dashboard.vue';
import Sucursales from '../views/Sucursales.vue';
import Empleados from '@/views/Empleados.vue';

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
    path: '/sucursales',
    name: 'Sucursales',
    component: Sucursales,
    meta: { requiresAuth: true }
  },
  {
    path: '/empleados',
    name: 'Empleados', // Añadimos la ruta para Empleados
    component: Empleados,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach(async (to) => {
  if (to.meta.requiresAuth === true) {
    
    const token = Cookies.get('token') ?? null;
    const decoded = token !== null ? VueJwtDecode.decode(token) : { is_auth: false };
    const isExpired = decoded.exp < Date.now() / 1000;

    if (token === null || !decoded.is_auth || isExpired) {
      Cookies.remove('token');
      return { name: 'Login' };
    } 
  } 

  if (to.meta.requiresLogin === true) {
    const token = Cookies.get('token') ?? null;
    if (!token) {
      return { name: 'Login' };
    } 
  }
});


export default router;
