<template>
    <div class="app-container cursorterBox">
      <el-row class="background-FFF padding-10">
          <!-- 搜索 -->
          <el-col :span="24">
              <bread-crumb style="float:left;line-height:40px"></bread-crumb>
              <el-input @keyup.enter.native="searchBtn"  class="search-input-box"
                placeholder="请输入通行证/姓名"
                v-model="searcKey">
                <i slot="prefix" class="el-input__icon el-icon-circle-close" v-show="searcKey" @click="searcKey='';searchBtn()"></i>
                <i slot="prefix" class="el-input__icon el-icon-search" @click="searchBtn"></i>
              </el-input>
          </el-col>
      </el-row>
      <el-row class="background-FFF height-100 padding-20 margin-top-15">
          <!-- 表格数据 -->
          <el-table
              v-loading="loading"
              element-loading-text="拼命加载中..."
              ref="multipleTable"
              :data="customerData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="通行证账号" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.passport}}</template>
              </el-table-column>
              <el-table-column prop="name" label="客户姓名" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column label="注册时间" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ showTimeNull(scope.row.regDate)==0?'-':scope.row.regDate/1000 |moment("YYYY-MM-DD HH:mm:ss") }}</template>
              </el-table-column>
              <el-table-column label="入海时间" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ showTimeNull(scope.row.enterHighSeasDate)==0?'-':scope.row.enterHighSeasDate/1000 |moment("YYYY-MM-DD HH:mm:ss") }}</template>
              </el-table-column>

              <el-table-column prop="useCloudFunctionTimes" label="使用云功能次数" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="useBimFunctionTimes" label="使用BIM应用次数" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column label="有效云套餐(个人/企业)" width="100" align="center"  show-overflow-tooltip>
                  <template slot-scope="scope">{{scope.row.personalCloudPkgNum}} / {{scope.row.entCloudPkgNum}}</template>
              </el-table-column>
              <el-table-column label="有效BIM套餐(个人/企业)" width="120" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">{{scope.row.personalBimPkgNum}} / {{scope.row.entBimPkgNum}}</template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <span class="operationBtn" @click="claimCustomerBtn(scope.row.passport)">认领</span><span class="operationBtn" @click="viewCustomerBtn(scope.row.passport)">查看</span>
                </template>
              </el-table-column>
          </el-table>

          <!-- 全选操作之后显示 -->
          <div class="selectionBox" v-show="multipleSelection.length>0">
              <i class="el-icon-info" style="color:#1890FF"></i>
              <span style="color:#666;margin-left:5px">已选择 {{multipleSelection.length}} 项</span>
              <span class="operationBtn" @click="claimAllCustomerBtn">批量认领</span>
          </div>

          <!-- 分页 -->
          <div class="block" v-show="customerData.length>0" style="text-align: center;margin-top:20px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="customerParam.page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="customerParam.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalElements">
              </el-pagination>
          </div>
      </el-row>

      <!-- 查看详情弹窗 -->
      <slide-view :showDetialBox="showDetialBox" :passwordId="passwordId" v-on:showDetialBoxConfalse="showDetialBoxConfalse"></slide-view>
      
    </div>
</template>

<script>
import axios from 'axios'
import slideView from '../../components/slideView/slideView'


import {getCustomerPublicList,getCustomerFollowUpResult,getCustomerClaim} from '@/api/table.js'


export default {
  components: {
    slideView
  },
  data() {
    return {
      loading:true,

      searcKey:'',//搜索值

      // 弹窗控制值
      showDetialBox:false,
      passwordId:null,

      // 列表数据
      customerData: [],

      multipleSelection: [], //选中数据


      customerParam:{
        "orders": [],
        "page": 0,
        "size": 0,
        "query": "",
      },

      totalElements:0,
    }
  },
  created() {
     this.getCustomerList();
  },
  watch: {
    // 检测路由切换页面
    $route() {

    }
  },
  methods: {
     // 初始化获取列表
    getCustomerList(){
        // console.log(this.customerParam)
        getCustomerPublicList(this.customerParam).then((res)=>{
            if(res.msg=='success'){
                this.loading=false;
                this.customerData=res.data.content;
                this.totalElements=res.data.totalElements;
            }
        })
    },
    // 列表选择操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页操作
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.customerParam.size=val;
      this.getCustomerList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.customerParam.page=val;
      this.getCustomerList();
    },
    // 单个认领操作
    claimCustomerBtn(id){
      let idArr=new Array();
      if(!Array.isArray(id)){
        idArr.push(id);
      }else{
        idArr=id;
      }
      getCustomerClaim(idArr).then((res)=>{
          if(res.msg=='success'){
              this.$message({
                type: 'success',
                message: '认领成功!'
              });
              this.getCustomerList();
          }else{
              this.$message({
                type: 'errow',
                message: res.msg
              });
          }
      })
    },
    // 单个查看操作
    viewCustomerBtn(id){
      // console.log(id);
      this.showDetialBox=!this.showDetialBox;
      this.passwordId=id;
    },
    // 单个查看组件传值
    showDetialBoxConfalse(value){
      console.log(value)
      this.showDetialBox=value;
    },
    // 批量认领操作
    claimAllCustomerBtn(){
      let id = this.multipleSelection.map(v => {return v.passport});
      this.claimCustomerBtn(id);
    },
    // 搜索
    searchBtn(){
      this.customerParam.page=1;
      this.customerParam.query=this.searcKey,
      this.getCustomerList();
    },
    showTimeNull(time){
        if(time<946656000000){
            time='0'
        }
        return time
    }
  }
}
</script>
