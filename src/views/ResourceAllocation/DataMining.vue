<template>
  <div class="app-container">
    <el-row style="margin-bottom:15px;" class="el-row-wrap">
      <div class="date-picker-wrap">
        <span>时间：</span>
        <el-date-picker v-model="startDateAndEndDate" type="daterange" style="width:40%" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" value-format='yyyy-MM-dd'>
        </el-date-picker>
        <el-button @click="selectDate('all')">全部</el-button>
        <el-button @click="selectDate('today')">今天</el-button>
        <el-button @click="selectDate('yesterday')">昨天</el-button>
        <el-button @click="selectDate('thisWeek')">本周</el-button>
        <el-button @click="selectDate('lastMonth')">上月</el-button>
        <el-button @click="selectDate('thisMonth')">本月</el-button>
      </div>
      <div style="margin-top:20px">
        <div>
          <span>任务名称：</span>
          <el-input placeholder="请输入名称" style="width:280px;" v-model="taskName">
          </el-input>
          <!-- <span>发起人：</span>
          <el-input placeholder="请输入发起人" style="width:180px" v-model="addUser"> -->
          <!-- </el-input> -->
          <span>任务状态：</span>
          <el-select v-model="status" placeholder="请选择" style="width:240px;margin-right:17px">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button @click="getDataMiningInfo">搜索</el-button>
          <el-button type="primary" @click="startMining">发起挖掘</el-button>
        </div>
      </div>
    </el-row>
    <el-row style="margin-bottom:15px;" class="el-row-wrap">
      <el-table :data="tableData" style="width: 100%" class="data-mining-table" height='645'>
        <el-table-column label="任务名称" prop="name" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            <span>{{ scope.row.startTime }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="发起人" prop="addUser">
        </el-table-column> -->
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1" style="color:blue">挖掘中</span>
            <span v-if="scope.row.status==2" style="color:#33A333">已完成</span>
            <span v-if="scope.row.status==3">已取消</span>
            <span v-if="scope.row.status==4" style="color:red">挖掘异常</span>
          </template>
        </el-table-column>
        <el-table-column label="结果" prop="result">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="el-icon-info " title="查看挖掘条件" @click="getMiningConditions(scope.row)"></span>
            <span class="el-icon-delete " title="取消挖掘" @click="cancleMining(scope.row.id)" v-if='scope.row.status==1'></span>
            <span class="el-icon-tickets " title="查看挖掘结果" @click="getResults(scope.row)" v-if="scope.row.status==2"></span>
            <span class="el-icon-refresh " title="重新挖掘" @click="reMining(scope.row)"></span>
            <span class="el-icon-download " title="导入" @click="importMiningInfo(scope.row.id)" v-if='scope.row.status!=1&&scope.row.status!=3'></span>

          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 25, 50]"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>
<script>
  import * as api from "@/api/ppc";
  import {
    getWeekStartDate,
    getLastWeekStartDate,
    getMonthStartDate,
    getLastMonthStartDate,
    formatDate
  } from "@/utils/index";
  export default {
    data() {
      return {
        addUser: "",
        startDateAndEndDate: "",
        taskName: "",
        status: "0",
        currentPage: 1,
        pageSize: 25,
        total: 0,
        statusOptions: [{
            value: "0",
            label: "全部"
          },
          {
            value: "1",
            label: "挖掘中"
          },
          {
            value: "2",
            label: "已完成"
          },
          {
            value: "3",
            label: "已取消"
          },
          {
            value: "4",
            label: "挖掘异常"
          }
        ],
        value: "",
        tableData: [{
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }]
      };
    },
    watch: {
      startDateAndEndDate(newValue, oldValue) {
        this.getDataMiningInfo();
      },
      status(newValue, oldValue) {
        this.getDataMiningInfo();
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
        this.getDataMiningInfo();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getDataMiningInfo();
      },
      formatDate(date) {
        if (Object.prototype.toString.call(date) == "[object Date]") {
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var weekday = date.getDate();
          if (month < 10) {
            month = "0" + month;
          }
          if (weekday < 10) {
            weekday = "0" + weekday;
          }
          return year + "-" + month + "-" + weekday;
        }
        return date;
      },
      selectDate(val) {
        const end = new Date(),
          start = new Date();
        switch (val) {
          case "all":
            this.startDateAndEndDate = [];
            break;
          case "today":
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
            this.startDateAndEndDate = [start, end];
            break;
          case "yesterday":
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
            this.startDateAndEndDate = [start, start];
            break;
          case "thisWeek":
            this.startDateAndEndDate = [getWeekStartDate(), end];
            break;
          case "lastMonth":
            this.startDateAndEndDate = [getLastMonthStartDate(), end];
            break;
          case "thisMonth":
            this.startDateAndEndDate = [getMonthStartDate(), end];
            break;

          default:
            break;
        }

        this.$emit("pick", new Date());
      },
      getDataMiningInfo() {
        let startDateAndEndDate_ = this.startDateAndEndDate?this.startDateAndEndDate.slice():[];
        let startDate = this.formatDate(startDateAndEndDate_[0]) ?
          this.formatDate(startDateAndEndDate_[0]) :
          "";
        let endDate = this.formatDate(startDateAndEndDate_[1]) ?
          this.formatDate(startDateAndEndDate_[1]) :
          "";
        let taskParam = {
          // addUser: this.addUser,
          page: this.currentPage,
          endDate: endDate,
          name: this.taskName,
          size: this.pageSize,
          startDate: startDate,
          status: this.status
        };
        api.getDataMiningInfo(taskParam).then(res => {
          console.log(res)
          this.tableData = res.data.content;
          this.total = res.data.totalElements
          console.log(this.tableData);
        });
      },
      getMiningConditions(row) {
         sessionStorage.setItem('curUserInfo', JSON.stringify(row))
        this.$router.push({
          path: `/resource-allocation/get-mining-conditions/${row.id}`
        });
      },
      getResults(row) {
        sessionStorage.setItem('curUserInfo', JSON.stringify(row))
        this.$router.push({
          path: `/resource-allocation/get-results/${row.id}`
        });
      },
      reMining(row) {
        this.$router.push({
          path: `/resource-allocation/remining/${row.id}`
        });
      },
      startMining() {
        this.$router.push({
          path: `/resource-allocation/startmining`
        });
      },
      importMiningInfo(miningId) {
        api.importMiningInfo(miningId).then(res => {
          if (res.code == 1) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }
        })

      },
      cancleMining(miningId) {
        api.cancleMining(miningId).then(res => {
          if (res.code == 1) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.getDataMiningInfo()
          }
        })
      }
    },
    mounted() {
      this.getDataMiningInfo();
    }
  };

</script>
<style rel="stylesheet/scss" lang="scss" scope>
  .data-mining-table [class*=" el-icon-"],
  [class^="el-icon-"] {
    font-size: 20px;
    line-height: 1.6;
    cursor: pointer;
  }

  .date-picker-wrap .el-button:nth-of-type(1) {
    margin-left: 1%;
  }

  .el-button+.el-button {
    margin-left: 1%;
  }

  .block {
    margin-top: 20px;
    text-align: center;
  }

</style>
