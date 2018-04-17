<template>
    <div class="app-container cursorterBox">
      <el-row class="background-FFF padding-10">
          <bread-crumb style="float:left;line-height:40px"></bread-crumb>
      </el-row>
      <el-row class="background-FFF height-100 padding-20 margin-top-15">
          <!-- 时间条件 -->
          <el-col :span="24">
              <div class="inline">
                  <span class="demonstration">下单时间：</span>
                  <el-date-picker
                    @change="changeRegist"
                    value-format="yyyy-MM-dd"
                    v-model="orderTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </div>
              <div class="inline"><el-button type="primary" @click="getCustomerRepList()">查询</el-button></div>
              <div class="inline" style="float: right;margin-right:20px"><el-button type="success" @click="exportExcel">导出Excel</el-button><a :href="downUrl" download id="downBtn" style="display:none">导出Excel</a></div>
          </el-col>
      
          <!-- 表格数据 -->
          <el-table
              v-loading="loading"
              element-loading-text="拼命加载中..."
              ref="multipleTable"
              :data="customerData"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column label="客户姓名" prop="serviceName"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="serviceName" label="员工姓名" show-overflow-tooltip></el-table-column>
              <el-table-column prop="serviceName" label="订单号"  show-overflow-tooltip></el-table-column>
              <el-table-column label="下单时间"  show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.registerDate/1000 |moment("YYYY-MM-DD HH:mm:ss") }}</template>
              </el-table-column>
              <el-table-column prop="serviceName" label="订单金额"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="serviceName" label="购买内容"  show-overflow-tooltip></el-table-column>
              <el-table-column label="支付方式" prop="serviceName" show-overflow-tooltip></el-table-column>
          </el-table>
      </el-row>
    </div>
</template>

<script>

import {getDataReportList,getExportRemove} from '@/api/table.js'


export default {
  data() {
    return {
      orderTime:'',
      loading:true,

      //导出地址
      downUrl:'',

      // 列表数据
      customerData: [],
      customerParam:{
        "customerClass":0,
        "dealDateSort": 0,//成交时间排序
        "endDealDate": "",//截止成交时间
        "endExpireDate": "",//结束到期时间 
        "endFollowupDate": "",//截止跟进时间 
        "endRegisterDate": "",//截止注册时间 
        "expireDateSort": 0,//到期时间排序
        "followupDateSort": 0,//按跟进时间排序 
        "followupResult": [],//拨打结果条件
        "isAll": "2",//是否搜全部:1部分范围搜索/2全部范围搜索
        "orders": [//排序条件,为null或长度为0表示不用排序 
          {
            "direction": 0,//排序方式 0 ASC 1 DESC
            "ignoreCase": false,//
            "order": {},
            "property": "string"//要排序的字段名
          }
        ],
        "page": 1,// 请求的页码，从1开始
        "pageRequest": {},
        "registerDateSort": 0,//
        "searchCondition": "",//搜索值
        "servceName": [],//客户专员,姓名 
        "size": 10,//每页的记录数,不指定表示不分页 ,
        "startDealDate": "",//起始成交时间 
        "startExpireDate": "",//开始到期时间
        "startFollowupDate": "",//起始跟进时间 
        "startRegisterDate": ""//起始注册时间
      },
    }
  },
  created() {
    this.getCustomerRepList();
  },
  watch: {
  },
  methods: {
      // 切换时间搜索
      changeRegist(val){
          console.log(val)
          val?this.customerParam.startRegisterDate=val[0]:this.customerParam.startRegisterDate='';//起始注册时间
          val?this.customerParam.endRegisterDate=val[1]:this.customerParam.endRegisterDate='';//截止注册时间
          if(!val){
              this.getCustomerRepList();
          }
      },
       // 初始化获取列表
      getCustomerRepList(){
          this.customerParam.customerClass=0;
          getDataReportList(this.customerParam).then((res)=>{
              if(res.msg=='success'){
                  this.loading=false;
                  this.customerData=res.data.content;
              }
          })
      },
      // 导出数据
      exportExcel(){
          alert("等接口调用" )
          getExportRemove().then((res)=>{
              if(res.msg=='success'){
                  this.downUrl = res.data;
                  setTimeout(() => {
                    document.getElementById("downBtn").click();
                  }, 200);
              }
          })
      }
  }
}
</script>



