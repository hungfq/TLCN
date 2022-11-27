import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../page/HomePage.vue';
import DashBoardPage from '../page/DashboardPage.vue';
import AdminPage from '../page/AdminPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
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
