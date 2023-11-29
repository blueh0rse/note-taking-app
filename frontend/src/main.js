import { createApp } from 'vue'; // Importa createApp invece di Vue
import App from './noteApp.vue';
import router from './router';
//import RegisterPage from './components/RegisterPage'
const app = createApp(App); // Crea un'app Vue

app.use(router); // Usa il router

app.mount('#app');

