import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/Login/LoginForm.vue';
import HomePage from '../page/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
