import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../page/HomePage.vue';
import DashBoardPage from '../page/DashboardPage.vue';
import AdminPage from '../page/AdminPage.vue';
import LecturerPage from '../page/LecturerPage.vue';
import StudentPage from '../page/StudentPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/admin',
    name: 'admin.default',
    component: AdminPage,
  },
  {
    path: '/lecturer',
    name: 'lecturer.default',
    component: LecturerPage,
  },
  {
    path: '/student',
    name: 'student.default',
    component: StudentPage,
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
