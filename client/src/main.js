import { createApp } from 'vue';
import VueKonva from 'vue-konva';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App)
  .use(store)
  .use(router)
  .use(VueKonva)
  .mount('#app');
