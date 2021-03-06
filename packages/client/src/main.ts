import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './main.css';

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import App from './App.vue';

const socket = io();

Vue.use(VueSocketIOExt, socket);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
