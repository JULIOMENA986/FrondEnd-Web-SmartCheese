import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { BootstrapVueNext } from 'bootstrap-vue-next';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

// Crea la aplicación Vue
const app = createApp(App);

// Usa los plugins
app.use(router);
app.use(VueAxios, axios);
app.use(BootstrapVueNext);

// Monta la aplicación
app.mount('#app');
