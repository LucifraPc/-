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
              <el-table-column label="客户姓名" prop="customerName" align="left"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="stuff" label="员工姓名" align="left"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="outTradeId" label="订单号" align="center"  show-overflow-tooltip></el-table-column>
              <el-table-column label="下单时间"  align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.enterTime/1000 |moment("YYYY-MM-DD HH:mm:ss") }}</template>
              </el-table-column>
              <el-table-column prop="totalPrice" label="订单金额" width="150" align="right"  show-overflow-tooltip></el-table-column>
              <el-table-column label="购买内容" width="400">

                <template slot-scope="scope">
                      <div class="ellipsis" :title="scope.row.contentInner">
                          <span v-for="(item,i) in scope.row.content" :key='i'>{{item}}</span>
                      </div>
                      <!-- <el-popover
                          ref="aaaaaa"
                          placement="right"
                          title="购买内容"
                          width="220"
                          trigger="hover">
                          <div style="max-height:300px;overflow-y:auto">
                              <div v-for="(item,i) in scope.row.content" :key='i'>{{item}}</div>
                          </div>
                      </el-popover>
                      <span v-popover:aaaaaa class="ellipsis" >
                          <span v-for="(item,i) in scope.row.content" :key='i'>{{item}}</span>
                      </span> -->
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
      // 支付方式， 0网银 1支付宝 2银行电汇 3人工订单 4微信 ,
      paymentWay:{
        "0":"网银",
        "1":"支付宝",
        "2":"银行电汇",
        "3":"人工订单",
        "4":"微信"
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
          if(val){
              if(this.customerParam.startDate == this.customerParam.endDate){
                  let startD=(val[0]+' 0:0:0');
                  this.customerParam.startDate = new Date(startD).getTime();
                  this.customerParam.endDate = new Date().setTime((this.customerParam.startDate/1000+24*60*60-1)*1000);
                  // console.log(this.customerParam.startDate,this.customerParam.endDate)
              }
          }
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
                  res.data.content.forEach(function (item,i) {
                      item.contentInner='';
                      item.content.forEach(function (iitem,j) {
                          iitem=(iitem+'  ')
                          item.contentInner += iitem;
                          // item.contentInner=item.contentInner.replace(/<br\/>/g, "&#10;")
                      })
                  })
                  // console.log(res.data.content)
                  // let serviceContent = res.data.content.replace(/<br\/>/g, "&#13;&#10;");
                  this.customerData=res.data.content;
                  // this.customerData.pop()
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



