<template>
  <div class="app-container">
    <el-row style="margin-bottom:15px;" class="el-row-wrap">
      <div class="date-picker-wrap">
        <span>时间：</span>
        <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-button>全部</el-button>
        <el-button>今天</el-button>
        <el-button>昨天</el-button>
        <el-button>本周</el-button>
        <el-button>上月</el-button>
        <el-button>本月</el-button>
      </div>
      <div style="margin-top:20px">
        <div>
          <span>任务名称：</span>
          <el-input placeholder="请输入名称" style="width:180px;margin-right:35px">
          </el-input>
          <span>发起人：</span>
          <el-input placeholder="请输入发起人" style="width:180px">
          </el-input>
          <el-button style="margin-right:45px">搜索</el-button>
          <span>任务状态：</span>
          <el-select v-model="value" placeholder="请选择" style="margin-right:44px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button @click="startMining">发起挖掘</el-button>
        </div>
      </div>
    </el-row>
    <el-row style="margin-bottom:15px;" class="el-row-wrap">
      <el-table :data="tableData" style="width: 100%" class="data-mining-table">
        <el-table-column label="任务名称" prop="name">
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发起人" prop="name">
        </el-table-column>
        <el-table-column label="状态" prop="name">
        </el-table-column>
        <el-table-column label="结果" prop="name">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="el-icon-info " title="查看挖掘条件" @click="getMiningConditions(scope.row)"></span>
            <span class="el-icon-tickets " title="查看挖掘结果" @click="getResults(scope.row)"></span>
            <span class="el-icon-refresh " title="重新挖掘" @click="reMining(scope.row)"></span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]"
          :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination> -->
      </div>
    </el-row>
  </div>
</template>
<script>
  // import {
  //   getDataMiningInfo
  // } from '@/api/ppc'
  import * as api from '@/api/ppc';
  export default {
    data() {
      return {
        value6: '',
        currentPage: "",
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      getDataMiningInfo() {
        api.getDataMiningInfo().then(res => {
          console.log(JSON.parse(res))
        })
      },
      getMiningConditions(row) {
        this.$router.push({
          path: `/resource-allocation/get-mining-conditions/${row.date}`
        });
      },
      getResults(row) {
        this.$router.push({
          path: `/resource-allocation/get-results/${row.date}`
        });
      },
      reMining(row) {
        this.$router.push({
          path: `/resource-allocation/remining/${row.date}`
        });
      },
      startMining() {
        this.$router.push({
          path: `/resource-allocation/startmining`
        });
      }
    },
    mounted() {
      this.getDataMiningInfo()
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scope>
  .data-mining-table [class*=" el-icon-"],
  [class^=el-icon-] {
    font-size: 20px;
    line-height: 1.6;
    cursor: pointer;
  }

  .date-picker-wrap .el-button:nth-of-type(1) {
    margin-left: 150px;
  }

  .el-button+.el-button {
    margin-left: 20px
  }

  .block {
    margin-top: 20px;
    text-align: center;
  }

</style>
