import Vue from 'vue'
import axios from 'axios'
import ProgressBar from 'vuejs-progress-bar'
import Notifications from 'vue-notification'

Vue.use(ProgressBar);
Vue.use(Notifications);

Vue.use(require('vue-moment'));

import App from './kitchen'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

window.$ = window.JQuery =  require('jquery');

$(document).mouseup(function (e) {
  var container = $(".dish.active");
  var container_btn = $(".wrap .buttons");
  if (container_btn.has(e.target).length === 0 && container.has(e.target).length === 0){
    container.toggleClass('active');
    container.next().toggleClass('active');
    container.parent().siblings('.wrap').find('.dish').toggleClass('blur');
  }
});