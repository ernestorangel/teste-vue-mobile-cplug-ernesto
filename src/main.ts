import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import pinia from './store';
import setupRouter from './router';

const app = createApp(App)
app.use(pinia)
const router = await setupRouter()
app.use(router)

app.mount('#app')
