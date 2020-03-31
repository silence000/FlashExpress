<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item><b>当前位置：</b></el-breadcrumb-item>
      <el-breadcrumb-item><b>客户服务中心</b></el-breadcrumb-item>
      <el-breadcrumb-item>新订单</el-breadcrumb-item>
      <el-breadcrumb-item>新建订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <div class="title"><b>商品查询</b></div>
      <div class="search-content">
        <span>商品名称：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="search_name"
          clearable
        >
        </el-input>
      </div>
      <el-button class="button" @click="query" type="primary">
        查询
      </el-button>
      <el-button
        class="button"
        @click="switchRouter('new_orders')"
        type="danger"
        size="mini"
      >
        返回
      </el-button>
    </div>
    <el-divider></el-divider>
    <div>
      <div class="title"><b>商品库存</b>（中心库房/分站库房）</div>
      <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        :data="tableData"
        stripe
        border
        style="width: 100%"
        min-width="1020"
        highlight-current-row
        @current-change="handleCurrentChange2"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column fixed prop="name" label="商品名称" width="400">
        </el-table-column>
        <el-table-column prop="repertoryNum" label="库存总量">
        </el-table-column>
        <el-table-column prop="returnNum" label="退回数量"> </el-table-column>
        <el-table-column prop="diliveryNum" label="可分配量"> </el-table-column>
        <el-table-column prop="usableNum" label="已分配量"> </el-table-column>
      </el-table>
      <br />
      <el-button type="primary" size="mini">生成缺货单</el-button>
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
    <el-divider></el-divider>
    <div class="title"><b>订购信息录入</b></div>
    <div class="detail-box">
      <div class="detail-box-line">
        <div class="search-content">
          <span>订单号：</span>
          <el-input
            class="mini-input"
            placeholder="无"
            v-model="series"
            size="small"
            :readonly="true"
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
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="search-content">
          <span>订单状态：</span>
          <el-input
            class="mini-input"
            placeholder="无"
            v-model="status"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
      </div>
      <div class="detail-box-line">
        <div class="search-content">
          <span>商品名称：</span>
          <el-input
            class="mini-input"
            placeholder="无"
            v-model="productName"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>商品数量：</span>
          <el-input
            class="mini-input"
            placeholder="请输入内容"
            v-model="number"
            @change="calculateTotal"
            size="small"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>商品说明：</span>
          <el-input
            class="mini-input"
            placeholder="请输入内容"
            v-model="productDescription"
            size="small"
          >
          </el-input>
        </div>
      </div>
      <div class="detail-box-line">
        <div class="search-content">
          <span>计量单位：</span>
          <el-input
            class="mini-input"
            placeholder="请输入内容"
            v-model="unit"
            size="small"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>单价：</span>
          <el-input
            class="mini-input"
            placeholder="请输入内容"
            v-model="price"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>总额：</span>
          <el-input
            class="mini-input"
            placeholder="无"
            v-model="totalPrice"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
      </div>
      <div class="detail-box-line">
        <div class="search-content">
          <span>客户姓名：</span>
          <el-input
            class="mini-input"
            placeholder="请输入内容"
            v-model="name"
            size="small"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>客户电话：</span>
          <el-input
            class="mini-input"
            placeholder="请输入内容"
            v-model="phone"
            size="small"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>客户邮编：</span>
          <el-input
            class="mini-input"
            placeholder="请输入内容"
            v-model="postcode"
            size="small"
          >
          </el-input>
        </div>
      </div>
      <div class="detail-box-line">
        <div class="search-content">
          <span>客户地址：</span>
          <el-input
            class="mini-input"
            placeholder="请输入内容"
            v-model="address"
            size="small"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>开始日期：</span>
          <el-input
            class="mini-input"
            placeholder="请输入内容"
            v-model="startDate"
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
            size="small"
          >
          </el-input>
        </div>
      </div>
      <br />
      <div class="button-group">
        <el-button-group>
          <el-button type="primary">确定</el-button>
          <el-button type="danger">清除</el-button>
          <el-button @click="switchRouter('new_orders')" type="warning"
            >返回</el-button
          >
        </el-button-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.query();
    // this.initOrders();
  },
  data() {
    return {
      options: [
        {
          value: "1",
          label: "普通配送订单"
        },
        {
          value: "2",
          label: "异地收款订单"
        },
        {
          value: "3",
          label: "换货单"
        },
        {
          value: "4",
          label: "退货单"
        }
      ],
      /* 商品查询与商品库存 */
      type: [], // 订单类型
      currentPage: 1, // 当前页
      size: 5, // 默认每页显示的条数
      total: 0, // 数据总条数
      multipleSelection: "", // 列表多选数组
      search_name: "", // 用于搜索商品名称
      tableData: [], // 商品库存数据
      currentRow: null, // 当前行
      /* 订购信息录入 */
      series: "", // 订单号
      status: "", // 订单状态
      productName: "", // 商品名称
      number: 1, // 商品数量
      productDescription: "", // 商品描述
      unit: "", // 计量单位
      price: 0, // 商品单价
      totalPrice: 0, // 总价
      name: "", // 客户姓名
      phone: "", // 客户电话
      address: "", // 客户地址
      postcode: "", // 客户邮编
      startDate: "", // 开始日期
      endDate: "" // 结束日期
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
      this.query();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.query();
    },
    handleCurrentChange2(val) {
      this.currentRow = val;
      this.productName = val.name;
      const that = this;
      const data = {
        name: this.productName
      };
      this.$axios({
        url:
          "http://192.168.0.105:8890/customerInfoService/getProductInfoByName",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          that.price = response.data.data.price;
          that.totalPrice = that.price;
          that.unit = response.data.data.unit;
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("执行了选择框");
      console.log(val);
    },
    initOrders() {
      const that = this;
      if (sessionStorage.getItem("customerID") == null) {
        that.$message({
          showClose: true,
          message: "非法进入! ",
          type: "error"
        });
        return;
      }
      const data = {
        customerId: sessionStorage.getItem("customerID")
      };
      this.$axios({
        url: "http://192.168.0.105:8890/customerInfoService/initOrder",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          that.series = response.data.data.series;
          sessionStorage.setItem("orderID", response.data.data.id);
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
    query() {
      const that = this;
      const data = {
        keyword: this.search_name,
        current: this.currentPage,
        size: this.size
      };
      this.$axios({
        url:
          "http://192.168.0.105:8890/customerInfoService/getCenterInfoByKeyword",
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
    },
    calculateTotal() {
      this.totalPrice = this.number * this.price;
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
    margin-top: 5px;
    span {
      line-height: 30px;
    }
  }
}
.detail-box {
  width: 900px;
  margin: 0 auto 0 auto;
  .button-group {
    text-align: center;
  }
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
    .input {
      width: 200px;
    }
  }
}
</style>
