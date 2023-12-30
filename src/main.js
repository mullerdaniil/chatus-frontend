import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
// app.config.globalProperties.BACKEND_URL = 'https://chatus-backend.onrender.com';
app.config.globalProperties.BACKEND_URL = 'http://localhost:8080';
app.mount('#app');
