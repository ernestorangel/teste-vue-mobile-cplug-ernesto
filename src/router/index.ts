import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Products from '@/views/Products.vue';
import Success from '@/views/Success.vue';
import NotFound from '@/views/NotFound.vue';
import History from '@/views/History.vue';

async function setupRouter() {
  const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home },
    { path: '/products', name: 'products', component: Products },
    { path: '/success', name: 'success', component: Success },
    { path: '/history', name: 'history', component: History },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  return router;
}

export default setupRouter;