import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";

import Home from "../pages/Home.vue";
import Dashboard from "../pages/Dashboard.vue";
import Convert from "../pages/Convert.vue";
import History from "../pages/History.vue";
import About from "../pages/About.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

// Your routes:
const routes = [
  { path: "/", component: Home },
  { path: "/dashboard", component: Dashboard, beforeEnter: authGuard },
  { path: "/convert", component: Convert, beforeEnter: authGuard },
  { path: "/history", component: History, beforeEnter: authGuard },
  { path: "/about", component: About },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
