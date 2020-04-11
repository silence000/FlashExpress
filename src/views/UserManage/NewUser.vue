<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item><b>当前位置：</b></el-breadcrumb-item>
      <el-breadcrumb-item><b>用户管理</b></el-breadcrumb-item>
      <el-breadcrumb-item>添加用户</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-content">
      <div class="input-content">
        <span>用户名：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="username"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="input-content">
        <span>密码：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="userpass"
          show-password
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="input-content">
        <span>确认密码：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="userpass2"
          show-password
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="input-content">
        <span>权限：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="role"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="input-content">
        <span>手机号：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="phone"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="input-content">
        <span>昵称：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="nickname"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="input-content">
        <span>地址：</span>
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
        <span>电子邮箱：</span>
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
        <el-button @click="reset" type="danger">重写</el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {},
  data() {
    return {
      username: "",
      userpass: "",
      userpass2: "",
      role: "",
      phone: "",
      nickname: "",
      address: "",
      email: ""
    };
  },
  methods: {
    submit() {
      const data = {
        username: this.username,
        userpass: this.userpass,
        role: this.role
      };
      this.axios({
        url: this.$store.state.API_URL + "/insertUser",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reset() {
      this.username = "";
      this.userpass = "";
      this.userpass2 = "";
      this.role = "";
    }
  },
  computed: {},
  watch: {}
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
    margin: 30px 0 30px 130px;
    width: 236px;
  }
}
</style>
