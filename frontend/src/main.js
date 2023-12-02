/*import { createApp } from 'vue'; // Importa createApp invece di Vue
import App from './noteApp.vue';
import router from './router';

const app = createApp(App); // Crea un'app Vue

app.use(router); // Usa il router

app.mount('#app');*/
import Vue from 'vue';
import App from './App.vue';
import store from './store';

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
