<template>
  <div class="app-container">
    <el-row style="margin-bottom:15px;" class="el-row-wrap">
      <!-- 搜索 -->
      <el-col :span="24">
        <el-badge :value="CurToAllocateNum" class="el-row-wrap--badge">
          <bread-crumb style="float:left;line-height:40px"></bread-crumb>
        </el-badge>
        <el-input class="search-input-box" placeholder="请输入通行证/姓名/手机号/QQ号搜索" v-model="searchValue">
          <i slot="prefix" class="el-input__icon el-icon-circle-close" v-show="searchValue" @click="searchValue=''"></i>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="el-row-wrap">
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="按人员分配" name="first">
            <div style="text-align:right">
              <el-button type="text" @click="handleAllocateDate(1)">提交分配数据</el-button>
            </div>
            <el-table :data="allocationMemberData" style="width: 100%">
              <el-table-column prop="username" label="员工姓名">
              </el-table-column>
              <el-table-column prop="totalCustomer" label="客户总数">
              </el-table-column>
              <el-table-column prop="allocatedToday" label="今日已分配数量">
              </el-table-column>
              <el-table-column prop="allocatedLastTime" label="上次分配数量">
              </el-table-column>
              <el-table-column prop="address" label="本次分配数量">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容" style="width:50%" v-model.trim="scope.row.allocatedThisTime" @blur='handleBlur($event)'></el-input>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 25, 50]"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="按资源分配" name="second">
            <div style="text-align:right;padding:15px 0">
              <el-select v-model="userId" placeholder="请选择" style="margin-right:68px">
                <el-option v-for="item in members" :key="item.userId" :label="item.username" :value="item.userId">
                </el-option>
              </el-select>
              <el-button type="text">提交分配数据</el-button>
            </div>
            <el-table :data="allocationResourceData" style="width: 100%">
              <el-table-column prop="passport" label="通行证账号">
              </el-table-column>
              <el-table-column prop="mobile" label="手机号码">
              </el-table-column>
              <el-table-column prop="miningTaskName" label="挖掘任务名称">
              </el-table-column>
              <el-table-column prop="miningDate" label="挖掘时间">
              </el-table-column>
              <el-table-column prop="address" label="分配给">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.userId" placeholder="请选择">
                    <el-option v-for="item in members" :key="item.userId" :label="item.username" :value="item.userId">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage_" :page-sizes="[10, 25, 50]"
                :page-size="pageSize_" layout="total, sizes, prev, pager, next, jumper" :total="total_">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>



  </div>
</template>
<script>
  import * as api from "@/api/ppc";
  export default {
    data() {
      return {
        searchValue: '',
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
        activeName: 'first',
        CurToAllocateNum:'',
        currentPage: 1,
        currentPage_: 1,
        pageSize: 10,
        pageSize_: 10,
        total: 10,
        total_: 10,
        members:[],
        allocationMemberData: [],
        allocationResourceData: [],
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
        userId: ''

      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getResourcesByPeopleList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getResourcesByPeopleList()
      },
      handleBlur(event) {
        let reg = /^\+?[1-9]\d*$/
        if (!reg.test(event.target.value) && event.target.value) {
          this.$message.error('请输入正确的数字！');          
        }
        if(event.target.value>this.CurToAllocateNum){
          this.$message.error(`当前时刻剩余待分配客户数为 ${this.CurToAllocateNum}，大于申请的数量，无法分配`); 
        }
      },
      getMembers(){
         api.getMembers().then(res=>{
           this.members=res.data;
         })
      },
      getCurToAllocateNum(){
        api.getCurToAllocateNum().then(res=>{
          this.CurToAllocateNum=res.data
        })
      },
      getAllocatedByPeopleList() {
        let param = {
          "orders": [{
            "direction": 0,
            "ignoreCase": false,
            "property": "allocatedToday"
          }],
          "page": this.currentPage,
          "size": this.pageSize
        }
        api.getAllocatedByPeopleList(param).then(res => {
          this.allocationMemberData = res.data.content;
          this.allocationMemberData.forEach(item => {
            this.$set(item, 'allocatedThisTime', null)
          })
          console.log(this.allocationMemberData)
          this.total = res.data.totalElements
        })
      },
      getAllocatedByResourceList() {
        let param = {
          "orders": [{
            "direction": 0,
            "ignoreCase": false,
            "property": "miningDate"
          }],
          "page": this.currentPage_,
          "size": this.pageSize_
        }
        api.getAllocatedByResourceList(param).then(res => {
          console.log(res, 'sssssssssssssssss')
          this.allocationResourceData = res.data.content;
          this.allocationResourceData.forEach(item =>{
            this.$set(item,'userId',null);
          } )
        })
      },
      handleAllocateDate(type) {
        if (type == 1) {
          let params = []
          this.allocationMemberData.forEach(item => {
            params.push({
              "allocCount": item.allocatedThisTime,
              "username": item.username
            })
          })
          api.handleAllocateDateByPeople(params).then(res => {
            if (res.code == '1') {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.getAllocatedByPeopleList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      }
    },
    mounted() {
      this.getAllocatedByPeopleList()
      this.getAllocatedByResourceList()
      this.getCurToAllocateNum()
      this.getMembers()
    }
  }

</script>

<style scoped>
  .block {
    margin-top: 20px;
    text-align: center
  }
</style>
