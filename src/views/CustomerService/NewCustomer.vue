<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item><b>当前位置：</b></el-breadcrumb-item>
      <el-breadcrumb-item><b>客户服务中心</b></el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建客户</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title"><b>新建客户</b></div>
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
          v-model="name"
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
          v-model="name"
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
          v-model="name"
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
          v-model="name"
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
          v-model="name"
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
          v-model="name"
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
          v-model="name"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <el-button-group class="button-group">
        <el-button type="success">保存</el-button>
        <el-button type="danger">重新填写</el-button>
        <el-button @click="switchRouter('customer_manage')" type="primary">返回</el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
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
