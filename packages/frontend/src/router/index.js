import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import LoginForm from '../components/Login/LoginForm.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld,
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
