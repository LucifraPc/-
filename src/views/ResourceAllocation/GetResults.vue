<template>
  <div class="app-container">
    <el-row class="el-row-wrap">
      <span style="display:inline-block;font-size: 18px;font-weight: bold;line-height: 38px;">任务名称：5555 时间：2018-04-09 14:34:26 发起人：吴凡</span>
      <el-button size="small" round @click="backToPrevious" style="float:right;margin-top:5px">返回</el-button>
    </el-row>
    <el-row class="el-row-wrap">
      稍后放置筛选条件
    </el-row>
    <el-row class="el-row-wrap">
      <span>用户名：</span>
      <el-input placeholder="请输入发起人" style="width:180px"></el-input>
      <el-button>搜索</el-button>
      <el-button>显示全部</el-button>
      <span>注册时间：</span>
      <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <span>跟进：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-row>
    <el-row class="el-row-wrap">
      <el-checkbox v-model="value4">隐藏已有企业云套餐的用户</el-checkbox>
      <el-checkbox v-model="value4">隐藏已有企业BIM套餐的用户</el-checkbox>
      <el-button type="success" style="float:right">导出Excel</el-button>
      <el-table :data="tableData" border style="width: 100%;margin-top:30px">
        <el-table-column prop="name" label="用户名">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="userDialogVisible = true">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="注册时间">
        </el-table-column>
        <el-table-column prop="address" label="有效云套餐(个人/企业)">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="cloudPackageDialogVisible=true">{{scope.row.address}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="有效BIM套餐(个人/企业)">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="cloudPackageDialogVisible=true">{{scope.row.address}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="使用云功能次数">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="cloudCountDialogVisible=true">{{scope.row.address}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="使用BIM应用次数">
          <template slot-scope="scope">
            <el-button type="text" size="small">{{scope.row.address}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="follow" label="跟进">
          <template slot-scope="scope">
            <el-button type="text" size="small">{{scope.row.address}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="用户详情" :visible.sync="userDialogVisible" width="30%">
      <table class="user-info">
        <tbody>
          <tr>
            <td>账号：</td>
            <td>建设监理001</td>
            <td>昵称：</td>
            <td>建设监理001</td>
          </tr>
          <tr>
            <td>手机：</td>
            <td>12345678901</td>
            <td>邮箱：</td>
            <td></td>
          </tr>
          <tr>
            <td>姓名：</td>
            <td></td>
            <td>职务：</td>
            <td></td>
          </tr>
          <tr>
            <td>工作单位：</td>
            <td></td>
            <td>单位类型：</td>
            <td></td>
          </tr>
          <tr>
            <td>QQ：</td>
            <td></td>
            <td>电话：</td>
            <td></td>
          </tr>
          <tr>
            <td>通讯地址：</td>
            <td>&nbsp;&nbsp;</td>
          </tr>
          <tr>
            <td>邮政编码：</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
    <el-dialog title="有效云套餐" :visible.sync="cloudPackageDialogVisible">
      <el-table :data="cloudPackageData" style="margin-top:-30px" class="cloud-package-table">
        <el-table-column property="name" label="套餐"></el-table-column>
        <el-table-column property="address" label="状态"></el-table-column>
        <el-table-column property="date" label="服务时间"></el-table-column>
      </el-table>
      <div class="block">
        <i class="el-icon-circle-check-outline"> 表示符合挖掘条件的套餐</i>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]"
          :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog title="云功能使用记录" :visible.sync="cloudCountDialogVisible">
      <el-table :data="cloudCountData" style="margin-top:-30px" class="cloud-count-table">
        <el-table-column property="name" label="套餐"></el-table-column>
        <el-table-column property="address" label="状态"></el-table-column>
        <el-table-column property="date" label="服务时间"></el-table-column>
      </el-table>
      <div class="block">
        <i class="el-icon-circle-check-outline"> 表示符合挖掘条件的套餐</i>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]"
          :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userDialogVisible: false,
        cloudPackageDialogVisible: false,
        cloudCountDialogVisible:false,
        currentPage4: 4,
        value: "",
        value4: "",
        value6: "",
        options: [{
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        tableData: [{
            date: "2016-05-02",
            name: "王小虎",
            address: "15",
            follow: "未更进"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "5",
            follow: "未更进"
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "6",
            follow: "未更进"
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "84",
            follow: "未更进"
          }
        ],
        cloudPackageData: [{
            date: "2017-08-07~2018-09-19(超过30天)",
            name: "鲁班场布",
            address: "有效"
          },
          {
            date: "2017-08-07~2018-09-19(超过30天)",
            name: "鲁班场布",
            address: "有效"
          },
          {
            date: "2017-08-07~2018-09-19(超过30天)",
            name: "鲁班场布",
            address: "有效"
          },
          {
            date: "2017-08-07~2018-09-19(超过30天)",
            name: "鲁班场布",
            address: "有效"
          }
        ],
        cloudCountData: [{
            date: "2018-01-24 20:14:56",
            area:'鲁班钢筋',
            name: "江苏省(153.37.198.174)",
            address: "骨架图"
          },
          {
            date: "服务时间：	2017-08-07~2018-09-19(超过30天)",
            area:'鲁班钢筋',
            name: "江苏省(153.37.198.174)",
            address: "骨架图"
          },
          {
            date: "服务时间：	2017-08-07~2018-09-19(超过30天)",
            area:'鲁班钢筋',
            name: "江苏省(153.37.198.174)",
            address: "骨架图"
          },
          {
            date: "服务时间：	2017-08-07~2018-09-19(超过30天)",
            area:'鲁班钢筋',
            name: "江苏省(153.37.198.174)",
            address: "骨架图"
          }
        ]

      };
    },
    methods: {
      backToPrevious() {
        this.$router.push({
          path: `/resource-allocation/data-mining`
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  };

</script>
<style rel="stylesheet/scss" lang="scss" scope>
  .el-row+.el-row {
    margin-top: 15px;
  }

  .user-info {
    font-size: 14px;
    margin: auto;
    tr {
      height: 40px;
      td:nth-child(odd) {
        text-align: right;
        width: 15%;
      }
      td:nth-child(even) {
        text-align: left;
        width: 30%;
      }
    }
  }

  .cloud-count-table {
    .el-table__header-wrapper {
      height: 0;
    }
  }

  .block {
    margin-top: 20px;
    text-align: center;
    .el-icon-circle-check-outline {
      margin-top: 10px;
      font-size: 16px;
      float: left;
    }
  }

</style>
