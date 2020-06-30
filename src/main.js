import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import animated from 'animate.css'
import click from './assets/js/click'

Vue.use(animated)
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})
Vue.config.productionTip = false

Vue.prototype.$isPlay = false; // 是否播放音乐

new Vue({
  click,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const setHtmlFontSize = () => {
  const htmlDom = document.getElementsByTagName('html')[0];
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  if (htmlWidth >= 750) {
    htmlWidth = 750;
  }
  if (htmlWidth <= 320) {
    htmlWidth = 320;
  }
  htmlDom.style.fontSize = `${htmlWidth / 7.5}px`;
};
window.onresize = setHtmlFontSize;
setHtmlFontSize();

window.msg =false;


