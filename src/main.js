import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import axios from 'axios'


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.prototype.$http = axios;

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')