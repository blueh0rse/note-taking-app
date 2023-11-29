import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import RegisterPage from './components/RegisterPage.vue';

const routes = [
    {
      path: '/login',
      name: 'Login',
      component: LoginForm,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: RegisterPage,
    },
    // ... other routes
  ];
  const router =createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

