<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item><b>当前位置：</b></el-breadcrumb-item>
      <el-breadcrumb-item><b>客户服务中心</b></el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
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
      <el-button
        class="button"
        @click="switchRouter('new_customer')"
        type="success"
        >新建</el-button
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
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
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button @click="details(scope.row)" size="mini">
              详细
            </el-button>
            <el-button @click="edit(scope.row)" type="primary" size="mini">
              编辑
            </el-button>
            <el-button
              @click="deleteOne(scope.row, scope.$index, tableData)"
              type="danger"
              size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-button type="primary" size="mini" @click="toggleSelection()"
        >取消选中</el-button
      >
      <el-button type="danger" size="mini" @click="deleteAll"
        >全部删除</el-button
      >
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
    edit(row) {
      sessionStorage.setItem("customerID", row.id);
      this.switchRouter("customer_edit");
    },
    deleteOne(row, index, rows) {
      const that = this;
      const data = {
        id: row.id
      };
      this.$confirm("此操作将永久删除选中客户的所有数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
          that
            .$axios({
              url:
                this.$store.state.API_URL +
                "/customerInfoService/deleteOneCustomer",
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
                  message: "删除成功!",
                  type: "success"
                });
              } else {
                that.$message({
                  showClose: true,
                  message: "删除失败!",
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteAll() {
      // todo 删除所有
      this.$confirm("此操作将永久删除选中的所有数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    details(row) {
      console.log(row);
      sessionStorage.setItem("customerID", row.id);
      this.switchRouter("customer_details");
    },
    // todo 全选 与 全部删除
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("执行了全选");
      console.log(val);
    },
    handleSizeChange(val) {
      this.size = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    queryList() {
      const that = this;
      const data = {
        conditions: {
          pid: this.pid,
          name: this.name,
          mobile: this.mobile
        },
        pageInfo: {
          current: this.currentPage,
          size: this.size
        }
      };
      this.$axios({
        url:
          this.$store.state.API_URL +
          "/customerInfoService/getCustomerInfoList",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          that.tableData = response.data.data;
          that.total = response.data.extra.total;
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
.breadcrumb {
  margin-bottom: 20px;
}
.title {
  color: $color-text-primary;
  margin-bottom: 10px;
}
.block {
  text-align: center;
  color: $color-text-primary;
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
