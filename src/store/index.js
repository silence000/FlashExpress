import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userID: "",
    API_URL: ""
  },
  mutations: {
    setUserID(state, val) {
      state.userID = val;
    }
  },
  actions: {},
  modules: {}
});
