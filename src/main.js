import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/css/main.css';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFeXFfvJLVBqmpdxFklKGdlA0vu1etiLs",
  authDomain: "grass-b5acb.firebaseapp.com",
  databaseURL: "https://grass-b5acb-default-rtdb.firebaseio.com",
  projectId: "grass-b5acb",
  storageBucket: "grass-b5acb.appspot.com",
  messagingSenderId: "998170531141",
  appId: "1:998170531141:web:55131f3d38a1d55d821a2c",
  measurementId: "G-BYF7JHV7WM",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Pinia
const pinia = createPinia();

// Create Vue app
const app = createApp(App);

// Use plugins
app.use(pinia);
app.use(router);

// Mount app
app.mount('#app');
