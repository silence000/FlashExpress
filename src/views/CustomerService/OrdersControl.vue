<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item><b>当前位置：</b></el-breadcrumb-item>
      <el-breadcrumb-item><b>客户服务中心</b></el-breadcrumb-item>
      <el-breadcrumb-item>订单操作</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <div class="title"><b>查询订单</b></div>
      <div class="search-content">
        <span>开始日期：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="startDate"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="search-content">
        <span>结束日期：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="endDate"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="search-content">
        <span>订单状态：</span>
        <el-select
          v-model="status"
          placeholder="请选择"
          size="small"
          class="input"
        >
          <el-option
            v-for="item in options2"
            :key="item.exKey"
            :label="item.exValue"
            :value="item.exKey"
          >
          </el-option>
        </el-select>
      </div>
      <el-button class="button" @click="queryList" type="primary"
        >查询</el-button
      >
    </div>
    <div class="search">
      <div class="search-content">
        <span>客户姓名：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="name"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="search-content">
        <span>客户手机：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="mobile"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="search-content">
        <span>订单类型：</span>
        <el-select
          v-model="type"
          placeholder="请选择"
          size="small"
          class="input"
        >
          <el-option
            v-for="item in options"
            :key="item.exKey"
            :label="item.exValue"
            :value="item.exKey"
          >
          </el-option>
        </el-select>
      </div>
      <el-button class="button" type="danger">重置</el-button>
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
        <el-table-column fixed prop="series" label="订单号" width="100">
        </el-table-column>
        <el-table-column prop="id" label="客户编号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="客户姓名" width="100">
        </el-table-column>
        <el-table-column prop="mobile" label="手机" width="120">
        </el-table-column>
        <el-table-column prop="productName" label="商品名称"> </el-table-column>
        <el-table-column prop="number" label="商品数量" width="80">
        </el-table-column>
        <el-table-column prop="type" label="订单类型" width="80">
        </el-table-column>
        <el-table-column prop="status" label="订单状态" width="80">
        </el-table-column>
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
              >退订</el-button
            >
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
export default {
  mounted() {
    this.queryList();
    this.initOptions();
  },
  data() {
    return {
      // 下拉框数据
      options: [],
      options2: [],
      // 查询数据
      startDate: "", // 开始日期
      endDate: "", // 结束日期
      status: "", // 订单状态
      type: "", // 订单类型
      name: "", // 客户姓名
      mobile: "", // 客户手机
      // 分页信息
      currentPage: 1, // 当前页
      size: 5, // 默认每页显示的条数
      total: 0,
      tableData: []
    };
  },
  methods: {
    switchRouter(path) {
      const location = "/main/" + path;
      if (this.$route.path !== location) {
        this.$router.push(location);
      }
    },
    handleSizeChange(val) {
      this.size = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },
    details(row) {
      console.log(row);
      this.switchRouter("orders_details");
    },
    edit(row) {
      console.log(row);
      this.switchRouter("orders_edit");
    },
    queryList() {
      const that = this;
      const data = {
        conditions: {
          name: this.name,
          mobile: this.mobile,
          status: this.status,
          type: this.type,
          startDate: this.startDate,
          endDate: this.endDate
        },
        pageInfo: {
          current: this.currentPage,
          size: this.size
        }
      };
      console.log(data);
      this.axios({
        url:
          "http://192.168.0.105:8890/customerInfoService/getOrderListByConditions",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          console.log(response.data);
          that.tableData = response.data.data;
          that.total = response.data.extra.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    initOptions() {
      const that = this;
      this.$axios({
        url: "http://192.168.0.105:8890/customerInfoService/getOrderType",
        method: "post"
      })
        .then(function(response) {
          // todo 测试输出
          console.log(response.data);
          that.options = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
          that.$message({
            showClose: true,
            message: "请求失败, 远程服务器出错! ",
            type: "error"
          });
        });
      this.$axios({
        url: "http://192.168.0.105:8890/customerInfoService/getOrderStatus",
        method: "post"
      })
        .then(function(response) {
          // todo 测试输出
          console.log(response.data);
          that.options2 = response.data.data;
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
  },
  computed: {},
  watch: {}
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
  margin-bottom: 10px;
  & + .search {
    margin-bottom: 20px;
  }
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
    .input {
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
