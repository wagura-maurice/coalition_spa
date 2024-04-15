// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './stores';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/styles/tailwind.css';

const app = createApp(App);

app.use(router);
app.use(store);
app.component('VueDatePicker', VueDatePicker);

app.mount('#app');
