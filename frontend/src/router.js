import { createRouter, createWebHistory } from 'vue-router';
import NoteApp from './noteApp.vue'; // Assicurati che il percorso sia corretto

const routes = [
  { path: '/', component: NoteApp },
  // Aggiungi altre rotte qui se necessario
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

