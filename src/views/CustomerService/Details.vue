<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item><b>当前位置：</b></el-breadcrumb-item>
      <el-breadcrumb-item><b>客户服务中心</b></el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户信息和订购商品</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title"><b>客户信息</b></div>
    <div class="detail-box">
      <div class="detail-box-line">
        <div class="search-content">
          <span>客户编号：</span>
          <el-input
            class="mini-input"
            placeholder="无"
            v-model="id"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>客户姓名：</span>
          <el-input
            class="mini-input"
            placeholder="无"
            v-model="name"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>身份证号：</span>
          <el-input
            class="mini-input"
            placeholder="无"
            v-model="pid"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
      </div>
      <div class="detail-box-line">
        <div class="search-content">
          <span>工作单位：</span>
          <el-input
            class="mini-input"
            placeholder="无"
            v-model="employer"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>座机：</span>
          <el-input
            class="mini-input"
            placeholder="无"
            v-model="telephone"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>移动电话：</span>
          <el-input
            class="mini-input"
            placeholder="无"
            v-model="mobile"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
      </div>
      <div class="detail-box-line">
        <div class="search-content">
          <span>联系地址：</span>
          <el-input
            class="mini-input"
            placeholder="无"
            v-model="address"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>邮编：</span>
          <el-input
            class="mini-input"
            placeholder="无"
            v-model="postcode"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>电子邮件：</span>
          <el-input
            class="mini-input"
            placeholder="无"
            v-model="email"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="title"><b>该客户已订购过的商品</b></div>
    <div class="search-box">
      <div class="search-box-line">
        <div class="search-content">
          <span style="width: 120px">订单生成日期：</span>
          <el-input
            class="mini-input"
            placeholder="请输入内容"
            v-model="date"
            clearable
            size="small"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>订单状态：</span>
          <el-input
            class="mini-input"
            placeholder="请输入内容"
            v-model="status"
            clearable
            size="small"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>订购商品：</span>
          <el-input
            class="mini-input"
            placeholder="请输入内容"
            v-model="product"
            clearable
            size="small"
          >
          </el-input>
        </div>
      </div>
      <el-button type="primary" size="small">查询</el-button>
      <el-button
        type="danger"
        size="small"
        @click="switchRouter('customer_manage')"
        >返回</el-button
      >
    </div>
    <div class="detail-table">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 902px; margin: auto"
      >
        <el-table-column prop="series" label="订单号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="400">
        </el-table-column>
        <el-table-column prop="number" label="数量" width="100">
        </el-table-column>
        <el-table-column prop="price" label="单价" width="100">
        </el-table-column>
        <el-table-column prop="total" label="总额" width="100">
        </el-table-column>
        <el-table-column prop="status" label="订单状态" width="100">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 客户信息部分
      id: "",
      name: "",
      pid: "",
      employer: "",
      telephone: "",
      mobile: "",
      address: "",
      postcode: "",
      email: "",
      // 搜索条件
      date: "",
      status: "",
      product: "",
      // 查询表格
      currentPage: 1,
      tableData: [
        {
          series: 100000,
          name: "杜蕾斯",
          number: 10,
          price: 20,
          total: 200,
          status: "已完成"
        },
        {
          series: 100000,
          name: "杜蕾斯",
          number: 10,
          price: 20,
          total: 200,
          status: "已完成"
        },
        {
          series: 100000,
          name: "杜蕾斯",
          number: 10,
          price: 20,
          total: 200,
          status: "已完成"
        },
        {
          series: 100000,
          name: "杜蕾斯",
          number: 10,
          price: 20,
          total: 200,
          status: "已完成"
        }
      ]
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
            that.id = response.data.data.id;
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
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../assets/scss/variable";
.title {
  color: $color-text-primary;
  margin: 20px 0 20px 0;
}
.detail-box {
  width: 900px;
  margin: 0 auto 0 auto;
}
.detail-box-line {
  height: 50px;
  width: 930px;
  color: $color-text-primary;
  .search-content {
    float: left;
    margin-right: 20px;
    span {
      display: inline-block;
      line-height: 32px;
      width: 80px;
      text-align: right;
    }
    .mini-input {
      width: 200px;
      input {
        color: $color-text-primary !important;
        background-color: white !important;
      }
    }
  }
}
.search-box {
  @extend .detail-box-line;
  width: 1070px;
  margin: 0 auto 0 auto;
}
.block {
  margin-top: 20px;
  text-align: center;
  color: $color-text-primary;
}
</style>
