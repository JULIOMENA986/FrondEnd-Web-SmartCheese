import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '../views/RegisterForm.vue';
import HomeView from '../views/HomeView.vue';
import LoginForm from '../views/LoginForm.vue';
import ConfirmateCodeAuth from '../views/ConfirmateCodeAuth.vue';
import Dashboard from '../views/Dashboard.vue';
//import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Login',
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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

/*router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token') || !store.getters.isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresLogin)) {
    if (store.getters.isLoggedIn) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});*/

export default router;
