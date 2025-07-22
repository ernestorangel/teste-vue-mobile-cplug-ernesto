import { createApp } from 'vue';
import './assets/styles/style.css';
import App from './App.vue';
import pinia from './store';
import setupRouter from './router';
import { useSalesStore } from './store/modules/sales';

const app = createApp(App);
app.use(pinia);
const router = await setupRouter();
app.use(router);

const salesStore = useSalesStore();
salesStore.loadSales(); // Carrega vendas salvas

app.mount('#app');
