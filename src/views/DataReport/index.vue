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
              <div class="inline" style="float: right;margin-right:20px"><el-button type="success" @click="exportExcel">导出Excel</el-button><a :href="downUrl" download="数据报表" id="downBtn"  style="display:none">导出Excel</a></div>
          </el-col>
      
          <!-- 表格数据 -->
          <el-table
              v-loading="loading"
              element-loading-text="拼命加载中..."
              ref="multipleTable"
              :data="customerData"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column label="客户姓名" prop="customerName"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="stuff" label="员工姓名" show-overflow-tooltip></el-table-column>
              <el-table-column prop="outTradeId" label="订单号"  show-overflow-tooltip></el-table-column>
              <el-table-column label="下单时间"  show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.enterTime/1000 |moment("YYYY-MM-DD HH:mm:ss") }}</template>
              </el-table-column>
              <el-table-column prop="totalPrice" label="订单金额" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column label="购买内容" >
                <template slot-scope="scope">
                  <el-popover
                      ref="popover1"
                      placement="right"
                      title="购买内容"
                      width="220"
                      trigger="hover">
                      <div style="max-height:300px;overflow-y:auto">
                          <div v-for="item in scope.row.content">{{item}}</div>
                      </div>
                  </el-popover>
                  <span class="ellipsis">
                    <span v-popover:popover1>
                        <span v-for="item in scope.row.content">{{item}}</span>
                    </span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="支付方式" show-overflow-tooltip>
                <template slot-scope="scope">{{paymentWay[scope.row.paymentWay]}}</template>
              </el-table-column>
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
        "endDate": null,
        "orders": [],
        "page": 1,
        "size": 2147483647,
        "startDate": null
      },
      // 支付方式，1支付宝，2微信，3银行电汇 ,
      paymentWay:{
        "1":"支付宝",
        "2":"微信",
        "3":"银行电汇"
      }
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
          val?this.customerParam.startDate=new Date(val[0]).getTime():this.customerParam.startDate='';//起始注册时间
          val?this.customerParam.endDate=new Date(val[1]).getTime():this.customerParam.endDate='';//截止注册时间
          if(!val){
              this.getCustomerRepList();
          }
      },
       // 初始化获取列表
      getCustomerRepList(){
          this.loading=true;
          getDataReportList(this.customerParam).then((res)=>{
              if(res.msg=='success'){
                  this.loading=false;
                  this.customerData=res.data.content;
              }
          })
      },
      // 导出数据
      exportExcel(){
          let endDate = -1;
          let startDate = -1;
          if(this.orderTime){
              endDate =  new Date(this.orderTime[0]).getTime();
              startDate = new Date(this.orderTime[1]).getTime();
          }

          this.downUrl = process.env.BASE_API +'rest/datareport/list/export/'+startDate+'/'+endDate;
          // console.log(this.downUrl)
          // document.getElementById("downBtn").setAttribute("download", "download");
          setTimeout(() => {
            document.getElementById("downBtn").click();
          }, 200);
      }
  }
}
</script>



