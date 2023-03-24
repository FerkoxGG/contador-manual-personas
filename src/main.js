import { createApp } from 'vue';
import App from './App.vue';

// Importa Bootstrap y su archivo CSS
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
app.mount('#app');
