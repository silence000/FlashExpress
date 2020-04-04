<template>
  <el-container>
    <el-aside width="200px" class="aside">
      <h3>FlashExpress物流管理</h3>
      <el-col>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-service"></i>
              <span>客户服务中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item @click="switchRouter('customer_manage')" index="1-1"
                >客户管理</el-menu-item
              >
              <el-menu-item @click="switchRouter('new_orders')" index="1-2"
                >新订单</el-menu-item
              >
              <el-menu-item @click="switchRouter('orders_control')" index="1-3"
                >订单操作</el-menu-item
              >
              <el-menu-item index="1-4">退货</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-truck"></i>
              <span>调度中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">订单操作</el-menu-item>
              <el-menu-item index="2-2">任务单查询</el-menu-item>
              <el-menu-item index="2-3">调拨单查询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-school"></i>
              <span>分站管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">任务分配</el-menu-item>
              <el-menu-item index="3-2">回执录入</el-menu-item>
              <el-menu-item index="3-3">配送员</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-office-building"></i>
              <span>库房管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">中心库房购货入库</el-menu-item>
              <el-menu-item index="4-2">中心库房调拨出库</el-menu-item>
              <el-menu-item index="4-3">分站库房调拨入库</el-menu-item>
              <el-menu-item index="4-4">领货</el-menu-item>
              <el-menu-item index="4-5">退货记录</el-menu-item>
              <el-menu-item index="4-6">分站库房退货出库</el-menu-item>
              <el-menu-item index="4-6">中心库房退货入库</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-guide"></i>
              <span>配送中心管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">商品管理</el-menu-item>
              <el-menu-item index="5-2">进货管理</el-menu-item>
              <el-menu-item index="5-3">库房管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-set-up"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1">添加用户</el-menu-item>
              <el-menu-item index="6-2">查询用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span>财务管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="7-1">查询购货单</el-menu-item>
              <el-menu-item index="7-2">与分站结算</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-cpu"></i>
              <span>中心决策</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="8-1">查询表单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="nav-link">
          <el-link :underline="false" @click="switchRouter('welcome')">
            <i class="fa fa-home"></i> 首页
          </el-link>
        </div>
        <div class="nav-link">
          <el-link :underline="false" @click="back"
            ><i class="fa fa-arrow-left"></i> 后退</el-link
          >
        </div>
        <div class="nav-link">
          <el-link :underline="false" @click="forward"
            ><i class="fa fa-arrow-right"></i> 前进</el-link
          >
        </div>
        <div class="nav-link">
          <el-link :underline="false" @click="refresh"
            ><i class="fa fa-sync-alt"></i> 刷新</el-link
          >
        </div>
        <div class="nav-link">
          <el-link :underline="false" @click="help"
            ><i class="fa fa-question"></i> 帮助</el-link
          >
        </div>
        <div class="nav-right">
          Hi，
          <span v-text="role"></span>：
          <span v-text="username"></span>
          <el-link :underline="false" @click="exit">
            <i class="fa fa-sign-out-alt"></i> 退出登录
          </el-link>
        </div>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
      <el-footer class="footer">
        <div class="footer-left">
          Copyright © by Excmmy. 2017-2020 All Rights Reserved.
        </div>
        <div class="footer-right">
          Version: 0.1.0
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      role: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.username = sessionStorage.getItem("userName");
      this.role = sessionStorage.getItem("roleDescription");
      if (this.username == null) {
        alert("尚未登录，请您先登录！");
        this.$router.push("/login");
      }
    },
    exit() {
      localStorage.clear();
      this.$router.push("/login");
    },
    refresh() {
      location.reload();
    },
    back() {
      history.go(-1);
    },
    forward() {
      window.history.forward();
    },
    help() {
      alert("并没有帮助");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    switchRouter(path) {
      const location = "/main/" + path;
      if (this.$route.path !== location) {
        this.$router.push(location);
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "../assets/scss/variable";
.aside {
  ul {
    background-color: $color-side-bg !important;
  }
  h3 {
    background-color: $color-title-bg;
    color: $color-white;
    text-align: center;
    margin: 0;
    line-height: 52px;
  }
}
.header {
  background-color: $color-title-bg;
  height: 52px !important;
  .nav-link {
    float: left;
    width: 70px;
    line-height: 50px;
    a {
      color: $color-text-placeholder;
      &:hover {
        color: $color-primary;
      }
    }
  }
  .nav-right {
    float: right;
    line-height: 50px;
    color: $color-side-bg;
    font-size: 14px;
    a {
      display: inline-block !important;
      text-align: right;
      width: 90px;
      color: $color-text-placeholder !important;
      &:hover {
        color: $color-primary !important;
      }
    }
  }
}
.main {
  background-color: $background-color-base;
}
.footer {
  background-color: $background-color-base;
  color: $color-text-primary;
  height: 50px !important;
  line-height: 50px;
  .footer-left {
    float: left;
  }
  .footer-right {
    float: right;
  }
}
</style>
