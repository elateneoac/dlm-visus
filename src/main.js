import "bootstrap/dist/css/bootstrap.min.css"

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";
import locales  from './assets/locales.json';

import * as d3 from 'd3';
d3.timeFormatDefaultLocale(locales.locale_es);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js"