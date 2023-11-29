import { createRouter, createWebHistory } from 'vue-router';
import NoteApp from './noteApp.vue'; // Assicurati che il percorso sia corretto
//import LoginForm from './components/LoginForm.vue'
import RegisterPage from './components/RegisterPage'
const routes = [
  { path: '/home', component: NoteApp },

 // { path: '/login', component: LoginForm },

  { path: '/register', component: RegisterPage },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

