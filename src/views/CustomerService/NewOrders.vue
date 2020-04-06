<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item><b>当前位置：</b></el-breadcrumb-item>
      <el-breadcrumb-item><b>客户服务中心</b></el-breadcrumb-item>
      <el-breadcrumb-item>新订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <div class="title"><b>查询客户</b></div>
      <div class="search-content">
        <span>身份证号：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="pid"
          clearable
          size="small"
          @change="pidRegVerify"
        >
        </el-input>
      </div>
      <div class="search-content">
        <span>姓名：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="name"
          clearable
          size="small"
          @change="nameRegVerify"
        >
        </el-input>
      </div>
      <div class="search-content">
        <span>手机号：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="mobile"
          clearable
          size="small"
          @change="mobileRegVerify"
        >
        </el-input>
      </div>
      <el-button class="button" @click="queryList" type="primary"
        >查询</el-button
      >
    </div>
    <div>
      <div class="title"><b>客户列表</b></div>
      <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        :data="tableData"
        stripe
        border
        style="width: 100%"
        min-width="1020"
      >
        <el-table-column fixed prop="id" label="客户编号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="客户姓名" width="80">
        </el-table-column>
        <el-table-column prop="employer" label="工作单位"> </el-table-column>
        <el-table-column prop="telephone" label="座机" width="125">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="120px">
        </el-table-column>
        <el-table-column
          prop="pid"
          label="身份证号"
          width="170px"
        ></el-table-column>
        <el-table-column label="操作" width="105">
          <template slot-scope="scope">
            <el-button @click="newOrders(scope.row)" type="primary" size="mini">
              新建订单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { RegxVerify } from "../../assets/js/RegxVerify";
export default {
  data() {
    return {
      update: true, // 刷新分页组件
      multipleSelection: [], // 列表多选数组
      pid: "", // 客户身份证号
      name: "", // 客户姓名
      mobile: "", // 客户手机号
      // 分页信息
      currentPage: 1, // 当前页
      size: 5, // 默认每页显示的条数
      total: 0,
      tableData: []
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    pidRegVerify() {
      if (RegxVerify(this.pid, "pid") === false) {
        this.$alert("请输入正确的身份证号", "警告", {
          confirmButtonText: "确定"
        });
        this.pid = "";
      }
    },
    nameRegVerify() {
      if (RegxVerify(this.name, "name") === false) {
        this.$alert("请输入正确的姓名", "警告", {
          confirmButtonText: "确定"
        });
        this.name = "";
      }
    },
    mobileRegVerify() {
      if (RegxVerify(this.mobile, "mobile") === false) {
        this.$alert("请输入正确的手机号", "警告", {
          confirmButtonText: "确定"
        });
        this.mobile = "";
      }
    },
    switchRouter(path) {
      const location = "/main/" + path;
      if (this.$route.path !== location) {
        this.$router.push(location);
      }
    },
    newOrders(row) {
      sessionStorage.setItem("customerID", row.id);
      sessionStorage.setItem("customerName", row.name);
      this.switchRouter("create_orders");
    },
    handleSizeChange(val) {
      this.size = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },
    queryList() {
      const that = this;
      const data = {
        pid: this.pid,
        name: this.name,
        mobile: this.mobile,
        current: this.currentPage,
        size: this.size
      };
      this.$axios({
        url:
          "http://192.168.0.105:8890/customerInfoService/getCustomerInfoList",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          that.tableData = response.data.data;
          that.total = response.data.data[0].total;
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
.block {
  text-align: center;
  color: $color-text-primary;
}
.breadcrumb {
  margin-bottom: 20px;
}
.title {
  color: $color-text-primary;
  margin-bottom: 10px;
}
.search {
  color: $color-text-primary;
  margin-bottom: 20px;
  .search-content {
    float: left;
    margin-right: 20px;
    span {
      display: inline-block;
      line-height: 32px;
    }
    .mini-input {
      width: 200px;
    }
  }
  .button {
    height: 30px;
    padding: 0 20px 0 20px;
    span {
      line-height: 30px;
    }
  }
}
</style>
