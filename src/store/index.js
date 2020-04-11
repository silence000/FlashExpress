import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_URL: "http://localhost:8890"
    // API_URL: "http://192.168.0.103:8890/"
  },
  mutations: {},
  actions: {},
  modules: {}
});
