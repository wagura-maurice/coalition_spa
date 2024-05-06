// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { taskStore } from '@/stores/taskStore';
import { rowSelectionStore } from '@/stores/rowSelectionStore';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/styles/tailwind.css';

const app = createApp(App);

app.use(router);
app.use(taskStore);
app.use(rowSelectionStore);
app.component('VueDatePicker', VueDatePicker);

app.mount('#app');
