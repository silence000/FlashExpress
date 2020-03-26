import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/login";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
