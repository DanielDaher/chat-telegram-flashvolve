import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/LoginScreen'

const routes = [
  { path: '/', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;