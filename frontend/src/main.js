/*import { createApp } from 'vue'; // Importa createApp invece di Vue
import App from './noteApp.vue';
import router from './router';

const app = createApp(App); // Crea un'app Vue

app.use(router); // Usa il router

app.mount('#app');*/
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');