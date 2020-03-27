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
        >
        </el-input>
      </div>
      <div class="search-content">
        <span>姓名：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="pid"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <div class="search-content">
        <span>电话号：</span>
        <el-input
          class="mini-input"
          placeholder="请输入内容"
          v-model="pid"
          clearable
          size="small"
        >
        </el-input>
      </div>
      <el-button class="button" type="primary">查询</el-button>
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
        <el-table-column fixed prop="series" label="客户编号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="客户姓名" width="80">
        </el-table-column>
        <el-table-column prop="employer" label="工作单位"> </el-table-column>
        <el-table-column prop="telephone" label="座机" width="125">
        </el-table-column>
        <el-table-column prop="mobile" label="移动电话" width="120px">
        </el-table-column>
        <el-table-column
          prop="pid"
          label="身份证号"
          width="170px"
        ></el-table-column>
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="mini">
              详细
            </el-button>
            <el-button
              @click="switchRouter('alter_customer')"
              type="primary"
              size="mini"
            >
              编辑
            </el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-button type="primary" size="mini" @click="toggleSelection()"
        >取消选中</el-button
      >
      <el-button type="danger" size="mini">全部删除</el-button>
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
      pid: "",
      multipleSelection: [],
      currentPage: 2,
      tableData: [
        {
          series: 100000,
          name: "谢文东",
          employer: "XDL兄弟连",
          telephone: "0455-82323297",
          mobile: "17612341234",
          pid: "210106197902232326"
        },
        {
          series: 100000,
          name: "谢文东",
          employer: "XDL兄弟连",
          telephone: "0455-82323297",
          mobile: "17612341234",
          pid: "210106197902232326"
        },
        {
          series: 100000,
          name: "谢文东",
          employer: "XDL兄弟连",
          telephone: "0455-82323297",
          mobile: "17612341234",
          pid: "210106197902232326"
        },
        {
          series: 100000,
          name: "谢文东",
          employer: "XDL兄弟连",
          telephone: "0455-82323297",
          mobile: "17612341234",
          pid: "210106197902232326"
        }
      ]
    };
  },
  methods: {
    switchRouter(path) {
      const location = "/main/" + path;
      if (this.$route.path !== location) {
        this.$router.push(location);
      }
    },
    handleClick(row) {
      console.log(row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
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
