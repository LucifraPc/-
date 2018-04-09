<template>
  <div class="app-container">
    <el-row style="margin-bottom:15px;" class="background-FFF padding-10">
      <!-- 搜索 -->
      <el-col :span="24">
        <bread-crumb style="float:left;line-height:40px"></bread-crumb>
        <el-input class="search-input-box" placeholder="请输入通行证/姓名/手机号/QQ号搜索" v-model="searchValue">
          <i slot="prefix" class="el-input__icon el-icon-circle-close" v-show="searchValue" @click="searchValue=''"></i>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="background-FFF padding-10">
      <el-col :span="24">

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="按人员分配" name="first">
            <div style="text-align:right;padding:15px 0">
              <el-button type="text">提交分配数据</el-button>
            </div>
            <el-table :data="allocationMemberData" style="width: 100%">

              <el-table-column prop="name" label="员工姓名">
              </el-table-column>
              <el-table-column prop="date" label="客户总数">
              </el-table-column>
              <el-table-column prop="address" label="今日已分配数量">
              </el-table-column>
              <el-table-column prop="address" label="上次分配数量">
              </el-table-column>
              <el-table-column prop="address" label="本次分配数量">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容" style="width:50%"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]"
                :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="按资源分配" name="second">
            <div style="text-align:right;padding:15px 0">
              <el-select v-model="value" placeholder="请选择" style="margin-right:68px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-button type="text">提交分配数据</el-button>
            </div>
            <el-table :data="allocationMemberData" style="width: 100%">
              <el-table-column prop="date" label="通行证账号">
              </el-table-column>
              <el-table-column prop="name" label="手机号码">
              </el-table-column>
              <el-table-column prop="address" label="挖掘任务名称">
              </el-table-column>
              <el-table-column prop="address" label="挖掘时间">
              </el-table-column>
              <el-table-column prop="address" label="分配给">
                <template slot-scope="scope">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]"
                :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>



  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchValue:'',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        activeName: 'second',
        currentPage4: 4,
        allocationMemberData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '2'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '3'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '5'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '4'
        }],
        allocationResourceData: [{
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
        }],
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
        value: ''

      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }

</script>

<style scoped>
  .block {
    margin-top: 20px;
    text-align: center
  }
</style>
