<template>
  <el-container>
    <el-main>
      <div class="container">
        <h2>FlashExpress<br />物流管理系统用户登录</h2>
        <p>用户名</p>
        <el-input
          v-model="username"
          placeholder="请输入用户名: "
          clearable
        ></el-input>
        <p>密码</p>
        <el-input
          placeholder="请输入密码: "
          v-model="userpass"
          show-password
          clearable
        ></el-input>
        <p>滑动验证</p>
        <slide-verify v-if="update" v-model="verify"></slide-verify>
        <div class="login-box">
          <el-button @click="submit" type="primary">登录</el-button>
          <el-button @click="refresh" type="danger">重置</el-button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import SlideVerify from "../../components/SlideVerify_PC";
export default {
  data() {
    return {
      username: "",
      userpass: "",
      verify: 0,
      update: true
    };
  },
  components: {
    SlideVerify
  },
  methods: {
    submit() {
      if (this.username.length !== 0) {
        if (this.userpass.length !== 0) {
          if (this.verify === 1) {
            this.ajax();
          } else {
            this.$message({
              showClose: true,
              message: "请拖动滑块进行滑动验证! ",
              type: "error"
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: "请输入密码! ",
            type: "error"
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: "请输入用户名! ",
          type: "error"
        });
      }
    },
    ajax() {
      const that = this;
      const data = {
        username: this.username,
        userpass: this.userpass
      };
      this.$axios({
        url: this.$store.state.API_URL + "/login",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          console.log(response.data);
          if (response.data.code + "" === "1") {
            sessionStorage.setItem("userID", response.data.data.id);
            sessionStorage.setItem("userName", response.data.data.username);
            that.queryAuthority(response.data.data.role);
            that.$message({
              showClose: true,
              message: "登录成功! 即将跳转到主页... ",
              type: "success"
            });
            setTimeout(function() {
              that.$router.push("/main");
            }, 1500);
          } else {
            that.$message({
              showClose: true,
              message: "用户名或密码错误! ",
              type: "error"
            });
            let reload = () => {
              that.username = "";
              that.userpass = "";
              that.verify = 0;
              // 移除组件
              that.update = false;
              // 在组件移除后，重新渲染组件
              // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
              that.$nextTick(() => {
                that.update = true;
              });
            };
            reload();
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message({
            showClose: true,
            message: "登录失败, 远程服务器出错! ",
            type: "error"
          });
        });
    },
    queryAuthority(role) {
      this.$axios
        .post(this.$store.state.API_URL + `/role/query${role}`)
        .then(function(response) {
          sessionStorage.setItem("roleVal", response.data.value);
          sessionStorage.setItem("roleDescription", response.data.description);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    refresh() {
      location.reload();
    },
    getData(val) {
      this.verify = val;
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../assets/scss/variable";
.container {
  width: 350px;
  height: 440px;
  position: absolute;
  left: 0;
  right: 0;
  top: -5%;
  bottom: 0;
  margin: auto;
  padding: 15px;
  border: 1px solid $color-primary;
  background: $background-color-base;
  color: $color-text-primary;
  border-radius: 5px;
  h2 {
    text-align: center;
  }
  .login-box {
    margin: 30px auto 0 auto;
    text-align: center;
  }
}
</style>
