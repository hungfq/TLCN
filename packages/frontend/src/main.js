import { createApp } from 'vue';
import './style.css';
import vue3GoogleLogin from 'vue3-google-login';
import App from './App.vue';
import router from './router/index';

const app = createApp(App);
app.use(vue3GoogleLogin, {
  clientId: '425982821596-l2c683uo8ivvn2r3klbkjh110ura031u.apps.googleusercontent.com',
  scope: 'email profile openid',
});
app.use(router);
app.mount('#app');
