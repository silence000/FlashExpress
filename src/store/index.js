import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userID: "",
    userName: "",
    roleVal: "",
    roleDescription: "",
    customerID: ""
  },
  mutations: {
    setUserID(state, val) {
      state.userID = val;
    },
    setUsername(state, val) {
      state.username = val;
    },
    setRoleVal(state, val) {
      state.roleVal = val;
    },
    setRoleDesc(state, val) {
      state.roleDescription = val;
    },
    setCustomerID(state, val) {
      state.customerID = val;
    }
  },
  actions: {},
  modules: {}
});
