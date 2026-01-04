import { createApp } from 'vue'
import "./styles/base.css";
import App from './App.vue';
import 'virtual:svg-icons-register';

const app=createApp(App);
app.mount('#app')
