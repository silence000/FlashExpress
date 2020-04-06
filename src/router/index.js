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

router.beforeEach((to, from, next) => {
  // to 目标路由
  // from 前一个路由
  // next 必须执行next方法, 才能跳转路由
  // 执行next(), 就会跳转到to对应的路由
  // 执行next(false), 不跳转 停留在当前页面
  // 执行next(xxx), 跳转到xxx页面
  // $ { //to and from are Route Object,next() must be called to resolve the hook}
  // }
  console.log("beforeEach:即将进入了:" + to.fullPath + "页面");
  if (to.fullPath === "/main/orders_control") {
    if ("0" === sessionStorage.getItem("roleVal")) {
      alert("权限验证通过");
    } else {
      alert("权限验证失败");
      next(false);
    }
  }
  next();
});

export default router;
