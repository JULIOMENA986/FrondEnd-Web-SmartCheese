import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '../views/RegisterForm.vue';
import HomeView from '../views/HomeView.vue';
import LoginForm from '../views/LoginForm.vue';
import ConfirmateCodeAuth from '../views/ConfirmateCodeAuth.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
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
    component: ConfirmateCodeAuth
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
export default router;