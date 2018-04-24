<template>
  <div class="app-container">
    <el-row style="margin-bottom:15px;" class="el-row-wrap">
      <!-- 搜索 -->
      <el-col :span="24">
        <el-badge :value="CurToAllocateNum" class="el-row-wrap--badge">
          <bread-crumb style="float:left;line-height:40px"></bread-crumb>
        </el-badge>
        <el-input class="search-input-box" placeholder="请输入通行证/手机号搜索" @keyup.enter.native="isResourcesByPeople?getAllocatedByPeopleList():getAllocatedByResourceList()"
          v-show='!isResourcesByPeople' v-model="searchValue">
          <i slot="prefix" class="el-input__icon el-icon-circle-close" v-show="searchValue" @click="searchValue='';isResourcesByPeople?getAllocatedByPeopleList():getAllocatedByResourceList()"></i>
          <i slot="prefix" class="el-input__icon el-icon-search" @click="isResourcesByPeople?getAllocatedByPeopleList():getAllocatedByResourceList()"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="el-row-wrap">
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="按人员分配" name="first">
            <div style="text-align:right">
              <el-button type="text" @click="handleAllocateData(1)">提交分配数据</el-button>
            </div>
            <el-table :data="allocationMemberData" style="width: 100%" @sort-change="tableSort">
              <el-table-column prop="username" label="员工姓名">
              </el-table-column>
              <el-table-column prop="totalCustomer" label="客户总数">
              </el-table-column>
              <el-table-column prop="allocatedToday" label="今日已分配数量" sortable>
              </el-table-column>
              <el-table-column prop="allocatedLastTime" label="上次分配数量">
              </el-table-column>
              <el-table-column prop="address" label="本次分配数量">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容" style="width:50%" v-model.trim="scope.row.allocatedThisTime" @blur='handleBlur($event,scope.row.username)'></el-input>
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
              <el-select v-model="userId" placeholder="请选择" style="margin-right:1%">
                <el-option v-for="item in members" :key="item.userId" :label="item.username" :value="item.userId">
                </el-option>
              </el-select>
              <el-button type="text" @click="handleAllocateData(2)">提交分配数据</el-button>
            </div>
            <el-table :data="allocationResourceData" style="width: 100%">
              <el-table-column prop="passport" label="通行证账号">
              </el-table-column>
              <el-table-column prop="mobile" label="手机号码">
              </el-table-column>
              <el-table-column prop="miningTaskName" label="挖掘任务名称">
              </el-table-column>
              <el-table-column prop="miningDate" label="挖掘时间">
                <template slot-scope="scope">
                  {{ showTimeNull(scope.row.miningDate)==0?'-':scope.row.miningDate/1000 |moment("YYYY-MM-DD HH:mm:ss") }}
                </template>
              </el-table-column>
              <el-table-column prop="address" label="分配给">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.username" placeholder="请选择" :disabled="isUseAllocate">
                    <el-option v-for="item in members_" :key="item.userId" :label="item.username" :value="item.username">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination @size-change="handleSizeChange_" @current-change="handleCurrentChange_" :current-page="currentPage_" :page-sizes="[10, 25, 50]"
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
        direction: 0,
        activeName: 'first',
        CurToAllocateNum: '',
        currentPage: 1,
        currentPage_: 1,
        pageSize: 10,
        pageSize_: 10,
        total: 10,
        total_: 10,
        members: [

        ],
        members_: [

        ],
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
        userId: 0,
        isResourcesByPeople: true
      }
    },
    computed: {
      //是否使用批量分配
      isUseAllocate: function () {
        return this.userId != 0
      }
    },
    methods: {
      showTimeNull(time) {
        if (time < 946656000000) {
          time = '0'
        }
        return time
      },
      tableSort(column) {
        console.log(column)
        column.order == "descending" ? (this.direction = 1) : (this.direction = 0);
        this.property = column.prop ? column.prop : 'allocatedToday';
        getAllocatedByPeopleList

      },
      handleClick(tab, event) {
        this.searchValue = '';
        this.isResourcesByPeople = tab.label == "按人员分配";
        this.getAllocatedByResourceList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getResourcesByPeopleList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getResourcesByPeopleList()
      },
      handleSizeChange_(val) {
        this.pageSize_ = val
        this.getAllocatedByResourceList()
      },
      handleCurrentChange_(val) {
        this.currentPage_ = val
        this.getAllocatedByResourceList()
      },
      handleBlur(event, username) {
        let reg = /^\+?[1-9]\d*$/
        if (!reg.test(event.target.value) && event.target.value) {
          this.$message.error('请输入正确的数字！');
        }
        if (event.target.value) {
          this.getRemainConut(username, event.target.value)
        }

      },
      getMembers() {
        api.getMembers().then(res => {
          this.members = res.data;
          this.members_ = this.members.slice(); //copy一份
          this.members.unshift({
            userId: 0,
            username: '请选择全部分给谁'
          })
          console.log(this.members, 'members')
        })
      },
      getCurToAllocateNum() {
        api.getCurToAllocateNum().then(res => {
          this.CurToAllocateNum = res.data;
          this.$store.dispatch('setCurToAllocateNum', this.CurToAllocateNum)
        })
      },
      /*查询指定电销人员剩余可分配的人员数量*/
      getRemainConut(username, value) {
        api.getRemainConut(username).then(res => {
          if (res.data < 0) {
            this.$message.error(`当前时刻剩余待分配客户数为0，小于申请的数量，无法分配`);
          }
          if (value > res.data) {
            this.$message.error(`当前时刻剩余待分配客户数为 ${res.data>0?res.data:0}，大于申请的数量，无法分配`);
          }
        })
      },
      /*获取按人员分配列表*/
      getAllocatedByPeopleList() {
        let param = {
          "orders": [{
            "direction": this.direction,
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
      /*获取按资源分配列表*/
      getAllocatedByResourceList() {
        let param = {
          "orders": [{
            "direction": 0,
            "ignoreCase": false,
            "property": "miningDate"
          }],
          "query": this.searchValue,
          "page": this.currentPage_,
          "size": this.pageSize_
        }
        api.getAllocatedByResourceList(param).then(res => {
          console.log(res, 'sssssssssssssssss')
          this.allocationResourceData = res.data.content;
          this.allocationResourceData.forEach(item => {
            this.$set(item, 'username', null);
          })
          this.total_ = res.data.totalElements
        })
      },
      /*提交按资源分配*/
      handleAllocateData(type) {
        //按人员分配
        if (type == 1) {
          let params = []
          this.allocationMemberData.forEach(item => {
            if (item.allocatedThisTime) {
              params.push({
                "allocCount": item.allocatedThisTime,
                "username": item.username
              })
            }
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
        } else {
          //按资源分配
          let params = []
          if (this.isUseAllocate) {
            let useAllocateName = ''
            this.members.forEach(item => {
              if (item.userId == this.userId) {
                useAllocateName = item.username
              }
            })
            this.allocationResourceData.forEach(item => {
              params.push({
                "customerPassport": item.passport,
                "employeeUsername": useAllocateName
              })
            })
          } else {
            this.allocationResourceData.forEach(item => {
              if (item.username) {
                params.push({
                  "customerPassport": item.passport,
                  "employeeUsername": item.username
                })
              }

            })
          }
          if (params.length == 0) {
            return
          }
          console.log(params)


          api.handleAllocateDateByResource(params).then(res => {
            if (res.code == '1') {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.getAllocatedByResourceList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      }
    },
    mounted() {
      this.getAllocatedByPeopleList()
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
