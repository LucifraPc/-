import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import BreadCrumb from './components/Breadcrumb'
import '@/icons' // icon
import '@/permission' // permission control
import $ from "jquery";
Vue.use(ElementUI)
Vue.component('bread-crumb',BreadCrumb);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
