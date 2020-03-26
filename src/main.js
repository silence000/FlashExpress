import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Axios from "./plugins/axios";

import SlideVerify from "vue-monoplasty-slide-verify";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./plugins/element.js";

Vue.config.productionTip = false;
Vue.use(ElementUI, SlideVerify, Axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
