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
      <el-button type="primary" @click="stockout" size="mini"
        >生成缺货单</el-button
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
              :key="item.exKey"
              :label="item.exValue"
              :value="item.exKey"
            >
            </el-option>
          </el-select>
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
            placeholder="无"
            v-model="unit"
            size="small"
            :readonly="true"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>单价(元)：</span>
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
          <span>总额(元)：</span>
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
            @change="nameRegVerify"
          >
          </el-input>
        </div>
        <div class="search-content">
          <span>客户手机：</span>
          <el-input
            class="mini-input"
            placeholder="请输入内容"
            v-model="phone"
            size="small"
            @change="mobileRegVerify"
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
            @change="postcodeRegVerify"
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
          <el-button @click="submit" type="primary">确定</el-button>
          <el-button @click="clear" type="danger">清除</el-button>
          <el-button @click="switchRouter('new_orders')" type="warning"
            >返回</el-button
          >
        </el-button-group>
      </div>
    </div>
  </div>
</template>
<script>
import { RegxVerify } from "../../assets/js/RegxVerify";

export default {
  mounted() {
    this.entryVerify();
    this.query();
    this.initOptions();
    this.initOrders();
  },
  data() {
    return {
      options: [],
      options2: [],
      /* 商品查询与商品库存 */
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
      type: "", // 订单类型
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
    nameRegVerify() {
      if (RegxVerify(this.name, "name") === false) {
        this.$alert("请输入正确的姓名", "警告", {
          confirmButtonText: "确定"
        });
        this.name = "";
      }
    },
    mobileRegVerify() {
      if (RegxVerify(this.phone, "mobile") === false) {
        this.$alert("请输入正确的手机号", "警告", {
          confirmButtonText: "确定"
        });
        this.phone = "";
      }
    },
    postcodeRegVerify() {
      if (RegxVerify(this.postcode, "postcode") === false) {
        this.$alert("请输入正确的邮政编码", "警告", {
          confirmButtonText: "确定"
        });
        this.postcode = "";
      }
    },
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
          this.$store.state.API_URL + "/customerInfoService/getProductInfoByName",
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
          sessionStorage.setItem("product_id", response.data.data.id);
          sessionStorage.setItem("product_series", response.data.data.series);
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
    calculateTotal() {
      this.totalPrice = this.number * this.price;
    },
    initOptions() {
      const that = this;
      this.$axios({
        url: this.$store.state.API_URL + "/customerInfoService/getOrderType",
        method: "post"
      })
        .then(function(response) {
          // todo 测试输出
          console.log(response.data);
          that.options = response.data.data;
          that.type = 5;
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
        url: this.$store.state.API_URL + "/customerInfoService/getOrderStatus",
        method: "post"
      })
        .then(function(response) {
          // todo 测试输出
          console.log(response.data);
          that.options2 = response.data.data;
          that.status = 1;
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
    entryVerify() {
      if (sessionStorage.getItem("customerID") == null) {
        this.$message({
          showClose: true,
          message: "非法进入! ",
          type: "error"
        });
      }
    },
    initOrders() {
      const that = this;
      const data = {
        customerId: sessionStorage.getItem("customerID")
      };
      this.$axios({
        url: this.$store.state.API_URL + "/customerInfoService/initOrder",
        data: data,
        method: "post",
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          that.series = response.data.data.series;
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
          this.$store.state.API_URL + "/customerInfoService/getCenterInfoByKeyword",
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
    submit() {
      const that = this;
      const data = {
        id: sessionStorage.getItem("orderID"),
        series: this.series,
        customerId: sessionStorage.getItem("customerID"),
        customerName: sessionStorage.getItem("customerName"),
        name: this.name,
        phone: this.phone,
        address: this.address,
        postcode: this.postcode,
        productId: sessionStorage.getItem("product_id"),
        productName: this.productName,
        productSeries: sessionStorage.getItem("product_series"),
        productDescription: this.productDescription,
        number: this.number,
        unit: this.unit,
        total: this.totalPrice, // 订单总金额
        type: this.type, // 订单类型
        status: this.status, // 订单状态
        price: this.price,
        startDate: this.startDate,
        endDate: this.endDate
      };
      // todo 测试输出
      console.log(data);
      this.axios({
        url: this.$store.state.API_URL + "/customerInfoService/updateOrderById",
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
              message: "提交成功!",
              type: "success"
            });
          } else {
            that.$message({
              showClose: true,
              message: "提交失败!",
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
    clear() {
      // todo
      alert("清除功能");
    },
    stockout() {
      // todo
      alert("缺货单");
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
