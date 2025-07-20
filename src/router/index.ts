import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('@/views/Home.vue');
const Products = () => import('@/views/Products.vue');
const Success = () => import('@/views/Success.vue');
const NotFound = () => import('@/views/NotFound.vue'); 
const History = () => import('@/views/History.vue'); 

async function setupRouter() {
  const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home },
    { path: '/products', name: 'products', component: Products },
    { path: '/success/:saleId', name: 'success', component: Success },
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