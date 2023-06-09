import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import store from "./store/store.js"
Vue.config.productionTip = false
Vue.config.devtools = true
new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
