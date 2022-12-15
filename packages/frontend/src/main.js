import { createApp } from 'vue';
import './style.css';
import vue3GoogleLogin from 'vue3-google-login';
import { vfmPlugin } from 'vue-final-modal';
import Toaster from '@meforma/vue-toaster';
import { plugin, defaultConfig } from '@formkit/vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import '@formkit/themes/genesis';

const app = createApp(App);
app.use(vue3GoogleLogin, {
  clientId: '425982821596-l2c683uo8ivvn2r3klbkjh110ura031u.apps.googleusercontent.com',
  scope: 'email profile openid',
});
app.use(router);
app.use(store);
app.use(Toaster);
app.use(plugin, defaultConfig);
app.use(CKEditor);

app.mount('#app');

app.use(vfmPlugin({
  key: '$vfm',
  componentName: 'VueFinalModal',
  dynamicContainerName: 'ModalsContainer',
}));
