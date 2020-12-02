import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import "./main.css";
import store from './store';

const base = axios.create({
  baseURL: 'http://localhost:3000'
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;

const token = localStorage.getItem('cl_token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['x-access-token'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')