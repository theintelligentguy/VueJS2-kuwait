import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:3000'; // Replace with your backend URL
Vue.prototype.$http = axios;

Vue.use(Vuetify);

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app');
