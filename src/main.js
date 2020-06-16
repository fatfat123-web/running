import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import click from './assets/js/click'

Vue.config.productionTip = false

new Vue({
  click,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
