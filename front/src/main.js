import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/plugins.css'
import '@/assets/css/style.css'
import '@/assets/css/color.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';
import axios from 'axios';
import YoutubeIframe from '@techassi/vue-youtube-iframe';
import Vue3SimpleHtml2pdf from "vue3-simple-html2pdf";

axios.defaults.baseURL = 'https://api.kiosk.gazar.mn/gazar';
// axios.defaults.baseURL = 'http://localhost:8010/gazar';
const token = localStorage.getItem('token');

if(token != null) {
    axios.defaults.headers.common.Authorization = 'Bearer ' + token;
}

const app = createApp(App)
console.warn = () => {};
app.use(router);
app.use(ElementPlus);
app.use(VuePlyr);
app.use(Vue3SimpleHtml2pdf);
app.use(YoutubeIframe);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$appUrl = 'https://api.kiosk.gazar.mn/gazar';
// app.config.globalProperties.$appUrl = 'http://localhost:8010/gazar';
app.mount('#app')