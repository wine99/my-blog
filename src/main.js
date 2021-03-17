import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Object.defineProperty(Vue.prototype, '$userInfo', {
  get() {
    return JSON.parse(window.localStorage.getItem('userInfo')) ?? null;
  },
});

Vue.use(ElementUI);

const vue = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// TODO: Not very elegant
// variable 'const vue' was introduced
// and the router logic should not be written in this file
router.onError((err) => {
  vue.$message.error(err.message);
});
