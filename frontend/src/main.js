// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
//import common from './assets/js/common'

import 'expose-loader?$!expose-loader?jQuery!jquery'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import BootstrapVue from 'bootstrap-vue'


//common.setAxiosInterceptors(localStorage.getItem('token-type'), localStorage.getItem('access-token'))
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const tokenType =  localStorage.getItem('token-type') || ''
  const accessToken =  localStorage.getItem('access-token') || ''

  config.headers.Authorization = tokenType + " " + accessToken
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

Vue.prototype.$http = axios;

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

Vue.use(BootstrapVue);
