import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/Home.vue';
import LoginForm from './components/LoginForm.vue';
import RegisterPage from './components/RegisterPage.vue';

const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
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

