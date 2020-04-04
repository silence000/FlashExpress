import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/Login";
import Welcome from "../views/Welcome";
import CustomerManage from "../views/CustomerService/CustomerManage";
import NewCustomer from "../views/CustomerService/NewCustomer";
import CustomerEdit from "../views/CustomerService/CustomerEdit";
import CustomerDetails from "../views/CustomerService/CustomerDetails";
import NewOrders from "../views/CustomerService/NewOrders";
import CreateOrders from "../views/CustomerService/CreateOrders";
import OrdersControl from "../views/CustomerService/OrdersControl";
import OrdersDetails from "../views/CustomerService/OrdersDetails";
import OrdersEdit from "../views/CustomerService/OrdersEdit";

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
        path: "customer_Edit",
        name: "CustomerEdit",
        component: CustomerEdit
      },
      {
        path: "customer_details",
        name: "CustomerDetails",
        component: CustomerDetails
      },
      {
        path: "new_orders",
        name: "NewOrders",
        component: NewOrders
      },
      {
        path: "create_orders",
        name: "CreateOrders",
        component: CreateOrders
      },
      {
        path: "orders_control",
        name: "OrdersControl",
        component: OrdersControl
      },
      {
        path: "orders_details",
        name: "OrdersDetails",
        component: OrdersDetails
      },
      {
        path: "orders_edit",
        name: "OrdersEdit",
        component: OrdersEdit
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
