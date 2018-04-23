<template>
  <div class="app-container">
    
    <el-row class="el-row-wrap">
      <el-button size="small" round @click="backToPrevious" style="float:right;margin-top:5px">返回</el-button>
      <iframe src="/static/dataMining/searchAgain.html" frameborder="0" style="width:100%;height:80vh"></iframe>
    </el-row>
    <!-- <el-row class="el-row-wrap">
      <span>任务名称：</span>
      <el-input placeholder="请输入任务名称" style="width:90%"></el-input>
    </el-row>
    <el-row class="el-row-wrap">
      <el-table :data="tableData" style="width: 100%" class="hide-table--header">
        <el-table-column prop="date" label="日期">
          <template slot-scope="scope">
            <el-select v-model="scope.row.conditionSelectValue" placeholder="请选择">
              <el-option v-for="item in scope.row.conditionSelect" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名">
          <template slot-scope="scope">
            <span>时间范围：</span>
            <el-date-picker v-model="scope.row.timePickerValue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </template>


        </el-table-column>
        <el-table-column prop="address" label="地址">

        </el-table-column>
      </el-table>
    </el-row> -->

  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
            conditionSelectValue: "",
            conditionSelect: [{
                value: "选项1",
                label: "登录产品"
              },
              {
                value: "选项2",
                label: "用户注册时间"
              },
              {
                value: "选项3",
                label: "登录地区"
              },
              {
                value: "选项4",
                label: "个人套餐购买情况"
              },
              {
                value: "选项5",
                label: "功能使用情况"
              },
              {
                value: "选项6",
                label: "账号登陆次数"
              },
              {
                value: "选项7",
                label: "账号在线时长"
              }
            ],
            timePickerValue:'',
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            conditionSelectValue: "",
            conditionSelect: [{
                value: "选项1",
                label: "登录产品"
              },
              {
                value: "选项2",
                label: "用户注册时间"
              },
              {
                value: "选项3",
                label: "登录地区"
              },
              {
                value: "选项4",
                label: "个人套餐购买情况"
              },
              {
                value: "选项5",
                label: "功能使用情况"
              },
              {
                value: "选项6",
                label: "账号登陆次数"
              },
              {
                value: "选项7",
                label: "账号在线时长"
              }
            ],
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }
        ]
      }
    },
    methods: {
      backToPrevious() {
        this.$router.push({
          path: `/resource-allocation/data-mining`
        });
      }
    },
    
    mounted() {
      window.basePath = process.env.BASE_API
      window.miningId = this.$route.params.id;
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scope>
  .el-row+.el-row {
    margin-top: 15px;
  }

  .hide-table--header {
    .el-table__header-wrapper {
      height: 0;
    }
  }

</style>
