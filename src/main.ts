import { createApp } from 'vue'
import { createPinia } from 'pinia';
import setupRouter from './router';
import './style.css'
import App from './App.vue'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

const router = await setupRouter()
app.use(router)

app.mount('#app')
