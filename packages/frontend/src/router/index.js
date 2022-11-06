import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/Login/LoginForm.vue';
import HomePage from '../page/HomePage.vue';
import DashBoardPage from '../page/DashboardPage.vue';

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
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashBoardPage,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
