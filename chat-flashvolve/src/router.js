import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from './components/LoginScreen'

const routes = [
  { path: '/', component: LoginScreen },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;