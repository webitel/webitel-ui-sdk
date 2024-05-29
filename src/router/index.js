import { createRouter, createWebHistory } from 'vue-router';

const routes = [];

const router = new createRouter({
  history: createWebHistory((process || import.meta).env.BASE_URL),
  routes,
});

export default router;
