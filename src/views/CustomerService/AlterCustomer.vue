<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item><b>当前位置：</b></el-breadcrumb-item>
      <el-breadcrumb-item><b>客户服务中心</b></el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改客户信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title"><b>修改客户信息</b></div>
    <div class="title">说明：有*的项目为必填项目</div>
    <div class="main-content">
      <div class="input-content">
        <span>*客户姓名：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="name"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="input-content">
        <span>*身份证号：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="pid"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="input-content">
        <span>*工作单位：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="employer"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="input-content">
        <span>座机：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="telephone"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="input-content">
        <span>*移动电话：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="mobile"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="input-content">
        <span>*联系地址：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="address"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="input-content">
        <span>邮编：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="postcode"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="input-content">
        <span>电子邮件：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="email"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <el-button-group class="button-group">
        <el-button @click="submit" type="success">保存</el-button>
        <el-button @click="reset" type="danger">重新填写</el-button>
        <el-button @click="switchRouter('customer_manage')" type="primary"
          >返回</el-button
        >
      </el-button-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      pid: "",
      employer: "",
      telephone: "",
      mobile: "",
      address: "",
      postcode: "",
      email: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    switchRouter(path) {
      const location = "/main/" + path;
      if (this.$route.path !== location) {
        this.$router.push(location);
      }
    },
    reset() {
      this.name = "";
      this.pid = "";
      this.employer = "";
      this.telephone = "";
      this.mobile = "";
      this.address = "";
      this.postcode = "";
      this.email = "";
    },
    init() {
      const that = this;
      const data = {
        // id: this.$store.state.customerID
        id: sessionStorage.getItem("customerID")
      };
      this.$axios({
        url: "http://192.168.0.105:8890/customerInfoService/getCustomer",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          if (response.data.code + "" === "1") {
            that.name = response.data.data.name;
            that.pid = response.data.data.pid;
            that.employer = response.data.data.employer;
            that.telephone = response.data.data.telephone;
            that.mobile = response.data.data.mobile;
            that.address = response.data.data.address;
            that.postcode = response.data.data.postcode;
            that.email = response.data.data.email;
          } else {
            that.$message({
              showClose: true,
              message: "数据获取失败!",
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message({
            showClose: true,
            message: "请求失败, 远程服务器出错! ",
            type: "error"
          });
        });
    },
    submit() {
      const that = this;
      const data = {
        id: this.$store.state.customerID,
        name: this.name,
        pid: this.pid,
        employer: this.employer,
        telephone: this.telephone,
        mobile: this.mobile,
        address: this.address,
        postcode: this.postcode,
        email: this.email
      };
      this.$axios({
        url: "http://192.168.0.105:8890/customerInfoService/updateCustomer",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          if (response.data.code + "" === "1") {
            that.$message({
              showClose: true,
              message: "保存成功!",
              type: "success"
            });
          } else {
            that.$message({
              showClose: true,
              message: "保存失败!",
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message({
            showClose: true,
            message: "请求失败, 远程服务器出错! ",
            type: "error"
          });
        });
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../assets/scss/variable";
.title {
  color: $color-text-primary;
  margin-top: 20px;
}
.main-content {
  width: 400px;
  margin: auto;
  .input-content {
    margin-top: 15px;
    span {
      width: 90px;
      display: inline-block;
      text-align: right;
    }
    .mini-input {
      width: 300px;
    }
  }
  .button-group {
    margin: 30px 0 30px 80px;
    width: 236px;
  }
}
</style>
