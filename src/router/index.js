import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/Login";
import Welcome from "../views/Welcome";
import CustomerManage from "../views/CustomerService/CustomerManage";
import NewCustomer from "../views/CustomerService/NewCustomer";
import AlterCustomer from "../views/CustomerService/AlterCustomer";
import Details from "../views/CustomerService/Details";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../components/Main"),
    redirect: "/main/welcome",
    children: [
      {
        path: "welcome",
        name: "Welcome",
        component: Welcome
      },
      {
        path: "customer_manage",
        name: "CustomerManage",
        component: CustomerManage
      },
      {
        path: "new_customer",
        name: "NewCustomer",
        component: NewCustomer
      },
      {
        path: "alter_customer",
        name: "AlterCustomer",
        component: AlterCustomer
      },
      {
        path: "details",
        name: "Details",
        component: Details
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
