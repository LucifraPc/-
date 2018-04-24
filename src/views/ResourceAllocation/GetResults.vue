<template>
  <div class="app-container">
    <el-row class="el-row-wrap">
      <span style="display:inline-block;font-size: 18px;font-weight: bold;line-height: 38px;">任务名称：{{curUserInfo.name}} 时间：{{curUserInfo.addTime}}</span>
      <el-button size="small" round @click="backToPrevious" style="float:right;margin-top:5px">返回</el-button>
    </el-row>
    <el-row class="el-row-wrap" style='height:350px;overflow-y:scroll'>
      <get-minconditions :isShowBack='false'></get-minconditions>
    </el-row>
    <el-row class="el-row-wrap">
      <span>用户名：</span>
      <el-input placeholder="请输入用户名" style="width:180px" v-model="username" @keyup.enter.native='getDataMiningResult'></el-input>
      <el-button @click="getDataMiningResult()">搜索</el-button>
      <el-button @click="isFollowUp='0';username='';startDateAndEndDate=[];isFilterEnterpriseBimPackage=false,isFilterEnterpriseCloudPackage=false,getDataMiningResult()">显示全部</el-button>
      <span>注册时间：</span>
      <el-date-picker value-format='yyyy-MM-dd' v-model="startDateAndEndDate" type="daterange" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <span>跟进：</span>
      <el-select v-model="isFollowUp" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <!-- <el-button type="success" style="float:right">导出Excel</el-button> -->
    </el-row>
    <el-row class="el-row-wrap">
      <el-checkbox v-model="isFilterEnterpriseCloudPackage">隐藏已有企业云套餐的用户</el-checkbox>
      <el-checkbox v-model="isFilterEnterpriseBimPackage">隐藏已有企业BIM套餐的用户</el-checkbox>

      <el-table :data="miningResultData" border style="width: 100%;margin-top:10px" v-loading="loading_miningResultData">
        <el-table-column prop="username" label="用户名">
          <template slot-scope="scope">
            <!-- @click="userDialogVisible = true;getMiningResultUserInfo(scope.row.username)" -->
            <el-button type="text" size="small">{{scope.row.username}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="registerTime" label="注册时间">
        </el-table-column>
        <el-table-column prop="address" label="有效云套餐(个人/企业)">
          <template slot-scope="scope">
            <!-- @click="cloudPackageDialogVisible=true;getUserPackageServices(scope.row.id,2,1,5,'有效云套餐')" -->
            <el-button type="text" size="small">{{`${scope.row.personalBimPackageNumber}/${scope.row.enterpriseBimPackageNumber}`}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="有效BIM套餐(个人/企业)">
          <template slot-scope="scope">
            <!-- @click="cloudPackageDialogVisible=true;getUserPackageServices(scope.row.id,12,1,5,'有效BIM套餐')" -->
            <el-button type="text" size="small">{{`${scope.row.personalCloudPackageNumber}/${scope.row.enterpriseCloudPackageNumber}`}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="useCloudFunctionTimes" label="使用云功能次数">
          <template slot-scope="scope">
            <!-- @click="cloudCountDialogVisible=true;getUserFunctionUsingLog(scope.row.username, '云功能')" -->
            <el-button type="text" size="small">{{scope.row.useCloudFunctionTimes}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="useBimFunctionTimes" label="使用BIM应用次数">
          <template slot-scope="scope">
            <!-- @click="cloudCountDialogVisible=true;getUserFunctionUsingLog(scope.row.username, 'BIM应用')" -->
            <el-button type="text" size="small">{{scope.row.useBimFunctionTimes}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="follow" label="跟进">
          <template slot-scope="scope">
            <!-- @click="followUpDialogVisible=true;getFollowUps(scope.row.username,scope.row.isFollowUp!=1)" -->
            <el-button type="text" size="small">{{scope.row.isFollowUp==2?'未跟进':'已跟进'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 25, 50]"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-row>
    <el-dialog title="用户详情" :visible.sync="userDialogVisible" width="30%">
      <table class="user-info">
        <tbody>
          <tr>
            <td>账号：</td>
            <td>{{userInfo.username}}</td>
            <td>昵称：</td>
            <td>{{userInfo.nickname}}</td>
          </tr>
          <tr>
            <td>手机：</td>
            <td>{{userInfo.mobile}}</td>
            <td>邮箱：</td>
            <td>{{userInfo.email}}</td>
          </tr>
          <tr>
            <td>姓名：</td>
            <td>{{userInfo.username}}</td>
            <td>职务：</td>
            <td>{{userInfo.position}}</td>
          </tr>
          <tr>
            <td>工作单位：</td>
            <td>{{userInfo.companyName}}</td>
            <td>单位类型：</td>
            <td>{{userInfo.companyTypeName}}</td>
          </tr>
          <tr>
            <td>QQ：</td>
            <td>{{userInfo.qq}}</td>
            <td>电话：</td>
            <td>{{userInfo.phone}}</td>
          </tr>
          <tr>
            <td>通讯地址：</td>
            <td>{{userInfo.provinceName+"&nbsp;"+userInfo.cityName+"&nbsp;"+userInfo.address}}</td>
          </tr>
          <tr>
            <td>邮政编码：</td>
            <td>{{userInfo.zipCode}}</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
    <el-dialog :title="packageTypeTitle" :visible.sync="cloudPackageDialogVisible">
      <el-table :data="cloudPackageData" style="margin-top:-30px" class="cloud-package-table" v-loading="loading_cloudPackageData">
        <el-table-column property="packageName" label="套餐"></el-table-column>
        <el-table-column property="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0" style="color:#33A333">有效</span>
            <span v-if='scope.row.status==1' style="color:red">无效</span>
          </template>
        </el-table-column>
        <el-table-column property="date" label="服务时间">
          <template slot-scope="scope">
            <div>{{`${scope.row.startTime}~${scope.row.endTime}(${scope.row.dayExplain})`}}</div>
          </template>
        </el-table-column>
      </el-table>
      <i class="el-icon-circle-check-outline"></i>表示符合挖掘条件的套餐
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15]"
          :page-size="5" layout="sizes, prev, pager, next" :total="50">
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog :title="packageTypeTitle" :visible.sync="cloudCountDialogVisible">
      <el-table :data="cloudCountData" style="margin-top:-30px" class="cloud-count-table" v-loading="loading_cloudCountData">
        <el-table-column property="usingTimeString" label=""></el-table-column>
        <el-table-column property="date" label="">
          <template slot-scope="scope">
            <div v-if='scope.row.productId==3'>鲁班土建</div>
            <div v-if='scope.row.productId==2'>鲁班钢筋</div>
            <div v-if='scope.row.productId==5'>鲁班安装</div>
          </template>
        </el-table-column>
        <el-table-column property="area" label="">
          <template slot-scope="scope">
            <div>{{`${scope.row.province}(${scope.row.ip})`}}</div>
          </template>
        </el-table-column>
        <el-table-column property="functionName" label="">

        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[5, 10, 15]"
          :page-size="5" layout="sizes, prev, pager, next" :total="50">
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog :title="packageTypeTitle" :visible.sync="followUpDialogVisible">
      <el-table :data="followUpData" style="margin-top:-30px" ref="followUpDataTable">
        <el-table-column property="addTimeString" label="跟进时间"></el-table-column>
        <el-table-column property="taskName" label="跟进任务" show-overflow-tooltip></el-table-column>
        <el-table-column property="content" label="跟进情况"></el-table-column>
        <el-table-column property="username" label="跟进人"></el-table-column>
      </el-table>
      <div class="block" v-show="isShowAddRecords">
        <el-button type="text" size="small" @click="showFollowUpTxt=true" v-show="!showFollowUpTxt">增加记录</el-button>

        <div v-show="showFollowUpTxt">
          <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="textarea">
          </el-input>
          <div style="margin-top:20px">
            <el-button type="primary" @click="showFollowUpTxt = false;followUpDialogVisible=false;addFollowUp()">确 定</el-button>
            <el-button @click="showFollowUpTxt = false;followUpDialogVisible=false;textarea=''">取 消</el-button>
          </div>
        </div>


      </div>
    </el-dialog>
  </div>
</template>
<script>
  import GetMinconditions from '@/views/ResourceAllocation/GetMiningConditions'
  import * as api from "@/api/ppc";
  export default {
    components: {
      GetMinconditions
    },
    data() {
      return {
        loading_miningResultData: true,
        loading_cloudPackageData: true,
        loading_cloudCountData: true,
        loading_followUptData: true,
        userDialogVisible: false,
        cloudPackageDialogVisible: false,
        cloudCountDialogVisible: false,
        followUpDialogVisible: false,
        isShowAddRecords: false,
        showFollowUpTxt: false,
        packageTypeTitle: '云套餐',
        miningID: '',
        isFollowUp: '0',
        username: '',
        startDateAndEndDate: '',
        isFilterEnterpriseBimPackage: '',
        isFilterEnterpriseCloudPackage: '',
        textarea: '',
        currentPage: 1,
        pageSize: 10,
        total: 10,
        curUserName: '',
        options: [{
            value: "0",
            label: "全部"
          },
          {
            value: "1",
            label: "已跟进"
          },
          {
            value: "2",
            label: "未跟进"
          },
        ],
        userInfo: {},
        miningResultData: [],
        cloudPackageData: [],
        cloudCountData: [],
        followUpData: [],
        curUserInfo: null
      };
    },
    watch: {
      isFollowUp() {
        this.getDataMiningResult()
      },
      isFilterEnterpriseBimPackage() {
        this.getDataMiningResult()
      },
      isFilterEnterpriseCloudPackage() {
        this.getDataMiningResult()
      },
      startDateAndEndDate(val) {
        this.getDataMiningResult()
      }
    },
    methods: {
      backToPrevious() {
        this.$router.push({
          path: `/resource-allocation/data-mining`
        });
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getDataMiningResult()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getDataMiningResult()
      },

      getDataMiningResult() {
        this.loading_miningResultData = true
        let taskResultParam = {
          page: this.currentPage,
          endDate: this.startDateAndEndDate ? this.startDateAndEndDate[1] : '',
          isFilterEnterpriseBimPackage: this.isFilterEnterpriseBimPackage ? 1 : 0,
          isFilterEnterpriseCloudPackage: this.isFilterEnterpriseCloudPackage ? 1 : 0,
          miningID: this.miningID,
          size: this.pageSize,
          startDate: this.startDateAndEndDate ? this.startDateAndEndDate[0] : '',
          username: this.username,
        }
        api.getDataMiningResult(taskResultParam).then(res => {
          this.miningResultData = res.data.content;
          this.total = res.data.totalElements;
          this.loading_miningResultData = false
        })
      },
      getMiningResultUserInfo(username) {
        let param = {
          username: username
        }
        api.getMiningResultUserInfo(param).then(res => {
          this.userInfo = JSON.parse(res)[0].result
        })
      },
      getUserPackageServices(mid, packageTypeInt, currentPage, pageSize, packageType) {
        this.loading_cloudPackageData = true
        this.packageTypeTitle = packageType
        let param = {
          miningResultId: mid,
          packageTypeInt: packageTypeInt,
          currentPage: currentPage,
          pageSize: pageSize
        }
        api.getUserPackageServices(param).then(res => {
          this.cloudPackageData = JSON.parse(res)[0].result.data
          this.loading_cloudPackageData = false
          //  console.log(JSON.parse(res)[0].result.data)
        })
      },
      getUserFunctionUsingLog(username, packageType) {
        this.loading_cloudCountData = true
        this.packageTypeTitle = `${packageType}使用记录`
        let param = {
          username: username,
          packageType: packageType,
          miningId: this.miningID,
          currentPage: 1,
          pageSize: 5
        }
        api.getUserFunctionUsingLog(param).then(res => {
          console.log(JSON.parse(res)[0].result.data)
          this.cloudCountData = JSON.parse(res)[0].result.data
          this.loading_cloudCountData = false
        })
      },
      getFollowUps(username, isShowAddRecords) {
        this.curUserName = username //记录当前username 添加记录使用
        this.loading_followUptData = true
        setTimeout(() => {
          this.$refs.followUpDataTable.bodyWrapper.style.display = 'block' //暂无数据提示
        }, 0);
        this.isShowAddRecords = isShowAddRecords
        this.packageTypeTitle = `跟进记录(${username})`
        let param = {
          username: username
        }
        api.getFollowUps(param).then(res => {
          // console.log(JSON.parse(res)[0].result)
          this.followUpData = JSON.parse(res)[0].result;
          this.loading_followUptData = false
          if (this.followUpData.length == 0) {
            this.$refs.followUpDataTable.bodyWrapper.style.display = 'none' //隐藏暂无数据提示
          }

        })
      },
      addFollowUp() {
        let param = {
          content: this.textarea,
          miningResultId: this.miningID,
          username: this.curUserName
        }
        api.addFollowUp(param).then(res => {
          this.getDataMiningResult()
        })
      }
    },
    created() {
      this.curUserInfo = JSON.parse(sessionStorage.getItem('curUserInfo'))
    },
    mounted() {
      this.miningID = this.$route.params.id
      this.getDataMiningResult()
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
  }

</style>
