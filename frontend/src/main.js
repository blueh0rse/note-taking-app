/*import { createApp } from 'vue'; // Importa createApp invece di Vue
import App from './noteApp.vue';
import router from './router';

const app = createApp(App); // Crea un'app Vue

app.use(router); // Usa il router

app.mount('#app');*/
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";
import HomePage from "./views/Home/HomePage.vue";
import DashboardPage from "./views/Dashboard/DashboardPage.vue"; // import other pages as needed

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/dashboard", component: DashboardPage }, // other routes
    // { path: "/home", component: HomePage },
    // { path: "/", component: DashboardPage }, // other routes
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated;
  console.log(isAuthenticated);

  // if (!isAuthenticated) {
  //   console.log("Redirecting to login");
  //   next("/"); // Redirect to login if not authenticated and trying to access a different route
  // } else {
  //   // next(); // Proceed with the navigation
  // }
  next(); // Proceed with the navigation
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
