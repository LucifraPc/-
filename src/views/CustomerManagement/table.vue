<template>
    <div class="app-container cursorterBox">
      <el-row style="margin-bottom:15px;" class="background-FFF padding-10">
          <!-- 搜索 -->
          <el-col :span="24">
              <bread-crumb style="float:left;line-height:40px"></bread-crumb>
              <el-checkbox-group v-model="searchAll" style="float:right;margin-left:20px;margin-top:10px">
                  <el-checkbox label="搜全部" name="searchAll" ></el-checkbox>
              </el-checkbox-group>
              <el-input class="search-input-box"
                placeholder="请输入通行证/姓名/手机号/QQ号搜索"
                v-model="searcKey">
                <i slot="prefix" class="el-input__icon el-icon-circle-close" v-show="searcKey" @click="searcKey='';searchBtn()"></i>
                <i slot="prefix" class="el-input__icon el-icon-search" @click="searchBtn"></i>
              </el-input>
          </el-col>
      </el-row>
      <el-row class="background-FFF height-100 padding-20">
          <!-- 时间条件 -->
          <el-col :span="24">
              <div class="inline">
                  <span class="demonstration">注册时间：</span>
                  <el-date-picker
                    @change="changeRegist"
                    value-format="yyyy-MM-dd"
                    v-model="registrationTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </div>
              <div class="inline">
                  <span class="demonstration">最新跟进时间：</span>
                  <el-date-picker
                    @change="changeFollow"
                    value-format="yyyy-MM-dd"
                    v-model="followUpTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </div>
          </el-col>

          <!-- 成交客户  即将到期  到期未续费显示此时间 -->
          <el-col :span="24" v-if="$route.name=='成交客户' || $route.name=='即将到期客户' || $route.name=='到期未续费' ">
              <div class="inline">
                  <span class="demonstration">成交时间：</span>
                  <el-date-picker
                    @change="changeClinchAdeal"
                    value-format="yyyy-MM-dd"
                    v-model="ClinchAdealTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </div>
              <div class="inline">
                  <span class="demonstration">到期时间：</span>
                  <el-date-picker
                    @change="changeExpire"
                    value-format="yyyy-MM-dd"
                    v-model="expireTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </div>
          </el-col>
      

          <!-- 表格数据 -->
          <el-table
              v-loading="loading"
              element-loading-text="拼命加载中..."
              ref="multipleTable"
              :data="customerData"
              @sort-change="changeSort"
              tooltip-effect="dark"
              @filter-change="filterChange"
              style="width: 100%;padding-top:10px"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="通行证账号" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.userName}}</template>
              </el-table-column>
              <el-table-column prop="userName" label="姓名" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="mobile" label="手机号码" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.mobile?scope.row.mobile:'-'}}</template>
              </el-table-column>
              <el-table-column v-if="$route.name=='新客户' || $route.name=='高意向' || $route.name=='可跟进'|| $route.name=='无法接通'|| $route.name=='无效线索' " label="QQ号" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.qq?scope.row.qq:'-'}}</template>
              </el-table-column>
              <el-table-column label="注册时间" prop="registerDate" sortable="custom" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ showTimeNull(scope.row.registerDate)==0?'-':scope.row.registerDate/1000 |moment("YYYY-MM-DD HH:mm:ss") }}</template>
              </el-table-column>
              <el-table-column label="成交时间"  prop="transactionTime" sortable="custom" v-if="$route.name=='成交客户' || $route.name=='即将到期客户' || $route.name=='到期未续费' " align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ showTimeNull(scope.row.transactionTime)==0?'-':scope.row.transactionTime/1000 |moment("YYYY-MM-DD HH:mm:ss") }}</template>
              </el-table-column>
              <el-table-column label="到期时间"  prop="expiredTime" sortable="custom" v-if="$route.name=='成交客户' || $route.name=='即将到期客户' || $route.name=='到期未续费' " align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ showTimeNull(scope.row.expiredTime)/1000 |moment("YYYY-MM-DD HH:mm:ss") }}</template>
              </el-table-column>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="serviceName"
                  label="销售人员"
                  column-key="serviceName"
                  :filters="followResultUser"
                  filter-placement="bottom-end">
                  <template slot-scope="scope">
                    <el-tag close-transition>{{scope.row.serviceName}}</el-tag>
                  </template>
              </el-table-column>
              <el-table-column
                  prop="tag"
                  label="拨打结果"
                  column-key="tag"
                  align="center"
                  :filters="followResult"
                  filter-placement="bottom-end">
                  <template slot-scope="scope">
                    <el-tag close-transition>{{callResult[scope.row.followupResult]}}</el-tag>
                  </template>
              </el-table-column>
              <el-table-column label="最新跟进时间"  prop="lastFollowupDate" sortable="custom" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ showTimeNull(scope.row.lastFollowupDate)==0?'-':scope.row.lastFollowupDate/1000 | moment("YYYY-MM-DD HH:mm:ss")  }}</template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <span class="operationBtn" @click="delCustomerBtn(scope.row.userName)">删除</span><span class="operationBtn" @click="followCustomerBtn(scope.row.userName)">跟进</span>
                </template>
              </el-table-column>
          </el-table>
          

          <!-- 全选操作之后显示 -->
          <div class="selectionBox" v-show="multipleSelection.length>0">
              <i class="el-icon-info" style="color:#1890FF"></i>
              <span style="color:#666;margin-left:5px">已选择 {{multipleSelection.length}} 项</span>
              <span class="operationBtn" @click="delAllCustomerBtn">批量删除</span>
              <span class="operationBtn" @click="assignedAllCustomerBtn();dialogVisible=true;">客户指派</span>
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
      <!-- 跟进详情弹窗 -->
      <slide-view :showDetialBox="showDetialBox" :passwordId="passwordId" v-on:changeListView="changeListView" v-on:showDetialBoxConfalse="showDetialBoxConfalse"></slide-view>
      <!-- 批量指派弹窗 -->
      <el-dialog
          title="客户指派"
          :visible.sync="dialogVisible"
          class="dialog770">
          <div>
              <h4 style="margin:0px;">部分指派：</h4>
              <p style="padding-left:40px;margin:10px 0px;">
                  已选择 {{multipleSelection.length}} 个客户，所属 {{assignedCount.length}} 个成员 <span class="assignedCountBox" :title="assignedCount"><span style="color:#1890FF" v-for="item in assignedCount">{{item}} </span></span>
                  <el-select v-model="assignedOptionsValue" placeholder="请选择指派给谁">
                      <el-option
                        v-for="item in assignedOptions"
                        :key="item.username"
                        :label="item.username"
                        :value="item.username">
                      </el-option>
                  </el-select>
                  <el-button type="primary" style="float:right;" @click="submitAssignment">提 交</el-button>
              </p>
              
          </div>
          <div>
              <h4 style="margin:0px;">全部指派：</h4>
              <p style="padding-left:40px;margin:10px 0px;">
                  指派
                  <el-select v-model="fromOptionsValue" @change="getOptionsCount" placeholder="请选择转走谁的">
                    <el-option
                      v-for="item in fromOptions"
                      :key="item.username"
                      :label="item.username"
                      :value="item.username">
                    </el-option>
                  </el-select> 的全部 {{fromOptionsCount}} 个客户
                  <el-select v-model="gotoOptionsValue" placeholder="请选择给谁">
                    <el-option
                      v-for="item in gotoOptions"
                      :key="item.username"
                      :label="item.username"
                      :value="item.username">
                    </el-option>
                  </el-select> 
                  <el-button type="primary" style="float:right;" @click="submitAssignmentAll">提 交</el-button>
              </p>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
          </span>
      </el-dialog>
      
    </div>
</template>

<script>
import slideView from '../../components/slideView/slideView'


import {getCustomerManagementList,getCustomerFollowUpResult,getCommissionerList,deleteCustomer,getCommissionerCustomerList,getCommissionerCustomerCount,getSubmitAssignment,getSubmitAssignmentAll} from '@/api/table.js'


export default {
  components: {
    slideView
  },
  data() {
    return {
      loading:true,

      searcKey:'',//搜索值
      searchAll:false,//搜索全部
      registrationTime:'',//注册时间
      followUpTime:'',//最新跟进时间
      ClinchAdealTime:'',//成交时间
      expireTime:'',//到期时间

      // 弹窗绑定值
      showDetialBox:false,
      passwordId:null,

      // 列表数据
      customerData: [],


      followResult:[
                    // { text: '可跟进', value: '可跟进' },
                    // { text: '高意向', value: '高意向' }, 
                    // { text: '关机', value: '关机' },
                    // { text: '无法接通', value: '无法接通' }, 
                    // { text: '已成交', value: '已成交' },
                    // { text: '停机', value: '停机' }, 
                    // { text: '空号', value: '空号' }, 
                    // { text: '错号', value: '错号' },
                    // { text: '未拨打', value: '未拨打' }, 
                    // { text: '用其他软件', value: '用其他软件' }
                  ],//跟进结果
      followResultUser:[
                    // { text: '辛元忠', value: '辛元忠' },
                    // { text: '裴奇致', value: '裴奇致' }, 
                    // { text: '纪乐容', value: '纪乐容' },
                    // { text: '赵国安', value: '赵国安' }, 
                    // { text: '郭博超', value: '郭博超' },
                    // { text: '明宏阔', value: '明宏阔' }, 
                    // { text: '封安民', value: '封安民' }, 
                  ],//客服专员

      multipleSelection: [], //选中数据

      totalElements:0,

      dialogVisible:false,//指派弹窗控制器
      assignedCount:[],//所属几个成员
      assignedCountList:[],//所属几个成员List
      assignedOptions:[],//部分指派给谁
      fromOptions:[],//全部转走谁的
      gotoOptions:[],//全部转给谁
      assignedOptionsValue:null,//部分指派给谁
      fromOptionsValue:null,//全部转走谁的
      gotoOptionsValue:null,//全部转给谁
      fromOptionsCount:null,//全部转走谁的客户数


      serviceName:[],//客服专员筛选
      tag:[],//跟进结果筛选

      customerParam:{
        "customerClass":1,
        "dealDateSort": 0,//成交时间排序
        "endDealDate": "",//截止成交时间
        "endExpireDate": "",//结束到期时间 
        "endFollowupDate": "",//截止跟进时间 
        "endRegisterDate": "",//截止注册时间 
        "expireDateSort": 0,//到期时间排序
        "expired": 0,//是否查询已经过期用户 1:是 ,
        "followupDateSort": 0,//按跟进时间排序 
        "followupResult": [],//拨打结果条件
        "isAll": "1",//是否搜全部:1部分范围搜索/2全部范围搜索
        "orders": [//排序条件,为null或长度为0表示不用排序 
         ],
        "page": 1,// 请求的页码，从1开始
        "pageRequest": {},
        "registerDateSort": 0,//
        "searchCondition": "",//搜索值
        "serviceName": [],//客户专员,姓名 
        "size": 10,//每页的记录数,不指定表示不分页 ,
        "soontoexpire": 0,//查询即将到期用户 1:是 ,
        "startDealDate": "",//起始成交时间 
        "startExpireDate": "",//开始到期时间
        "startFollowupDate": "",//起始跟进时间 
        "startRegisterDate": ""//起始注册时间
      },
      
      type:{// 客户分类结果集
        "新客户": 1,
        "高意向": 2,
        "可跟进": 3,
        "即将到期客户": 97,
        "到期未续费": 98,
        "成交客户": 4,
        "无法接通": 5,
        "无效线索": 6
      },
      callResult:{// 客户分类结果集
        "0": "无",
        "1": "接通",
        "2": "未接",
        "3": "关机",
        "4": "无人接听",
        "5": "停机",
        "6": "空号",
        "7": "使用其他软件",
      },

    }
  },
  created() {
      let vthis=this;
        // if(vthis.$route.name=='即将到期客户'){
        //     vthis.searchAll=true;
        //     vthis.customerParam.isAll="2";
        //     vthis.customerParam.soontoexpire=1;
        //     vthis.customerParam.customerClass=0;
        // }else if(vthis.$route.name=='到期未续费'){
        //     vthis.searchAll=true;
        //     vthis.customerParam.isAll="2";
        //     vthis.customerParam.expired=1;
        //     vthis.customerParam.customerClass=0;
        // }else{
        //     // vthis.searchAll=false;
        //     vthis.customerParam.isAll="1";
        //     vthis.customerParam.soontoexpire=0;
        //     vthis.customerParam.expired=0;
        //     vthis.customerParam.customerClass=vthis.type[vthis.$route.name];
        // }
      // 初始化获取列表
      this.getCustomerList();
      // 初始化获取客户专员筛选
      this.getCommissionerList();
      // 初始化获取拨打结果筛选
      this.getCallList();
  },
  watch: {
    // 检测路由切换页面
    $route() {
      // console.log(this.$route.name)
      // 路由切换 初始化数据
      // this.registrationTime='';
      // this.followUpTime='';
      // this.ClinchAdealTime='';
      // this.expireTime='';
      // this.searcKey='';
      // this.searchAll=false;
      // this.multipleSelection=[];
      // this.currentPage=1;
      // this.showDetialBox=false;
      // this.loading=true;
      // this.customerParam.page=1;
      // this.customerParam.size=10;
      // this.followResultUser=[];
      // this.followResult=[];
      // 初始化获取列表
      // this.getCustomerList();
      // 初始化获取客户专员筛选
      // this.getCommissionerList();
      // 初始化获取拨打结果筛选
      // this.getCallList();
    },
    // 检测搜索全部操作
    'searchAll'(){
        this.getCustomerList();
    }
  },
  methods: {
    // 初始化获取客户专员筛选
    getCommissionerList(){
        let vthis=this;
        // let customerState = 0;
        // if(vthis.$route.name=='即将到期客户' || vthis.$route.name=='到期未续费'){
        //     customerState = 0;
        // }else{
        //     customerState = vthis.type[vthis.$route.name]
        // }
        let customerState = vthis.type[vthis.$route.name]
        getCommissionerList(customerState).then((res)=>{
            if(res.msg=='success'){
              if(res.data){
                  res.data.forEach(function (item,index) {
                    let obj={
                      text: '', value: ''
                    }
                    obj.text=item.serviceName;
                    obj.value=item.serviceName;
                    vthis.followResultUser.push(obj)
                })
              }
                
                // this.followResultUser=res.data;
            }
        })
    },
    // 初始化获取拨打结果筛选
    getCallList(){
        let vthis=this;
        getCustomerFollowUpResult().then((res)=>{
            if(res.msg=='success'){
              if(res.data){
                res.data.forEach(function (item,index) {
                    let obj={
                      text: '', value: ''
                    }
                    obj.text=item.followup;
                    obj.value=item.followupId;
                    vthis.followResult.push(obj)
                })
              }
                // console.log(vthis.followResult)
                // this.followResult=res.data;
            }
        })
    },
    // 初始化获取列表
    getCustomerList(){
        let vthis=this;
        vthis.customerParam.customerClass=vthis.type[vthis.$route.name];
        getCustomerManagementList(vthis.customerParam).then((res)=>{
            if(res.msg=='success'){
                vthis.loading=false;
                vthis.customerData=res.data.content;
                vthis.totalElements=res.data.totalElements;
            }
        })
    },
    // 去重
    setArrRep(arr){
      var obj = {}
      for(var i  in arr){
         obj[arr[i]] = true;
      }
      console.log(obj);
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
    // 单个删除操作
    delCustomerBtn(id){
      // console.log(id)
      let idArr=new Array();
      if(!Array.isArray(id)){
        idArr.push(id);
      }else{
        idArr=id;
      }
      this.$confirm('确定将客户转入公海?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteCustomer(idArr).then((res)=>{
            if(res.msg=='success'){
                this.$message({
                  type: 'success',
                  message: '转入成功!'
                });
                this.getCustomerList();
            }else{
                this.$message({
                  type: 'errow',
                  message: '转入失败!'
                });
            }
        })
      }).catch(() => {
        
      });
    },
    // 单个跟进操作
    followCustomerBtn(id){
      // console.log(id);
      this.showDetialBox=!this.showDetialBox;
      this.passwordId=id;
    },
    // 单个跟进组件传值
    showDetialBoxConfalse(value){
      console.log(value)
      this.showDetialBox=value;
    },
    changeListView(value){
        this.getCustomerList();
    },
    // 批量删除操作
    delAllCustomerBtn(){
      // deleteCustomer
      let id = this.multipleSelection.map(v => {return v.userName})
      // console.log(id)

      this.delCustomerBtn(id);
     
    },
    // 获取转走人员的客户数
    getOptionsCount(){
        let stuff=this.fromOptionsValue;
        getCommissionerCustomerCount(stuff).then((res)=>{
            if(res.msg=='success'){
                if(res.data){
                    this.fromOptionsCount=res.data;
                }
            }
        })
    },
    // 获取全部人员
    qeryStaffList(){
        let roles=[65,66];
        getCommissionerCustomerList(roles).then((res)=>{
            if(res.msg=='success'){
                if(res.data){
                    this.assignedOptions=res.data;
                    this.fromOptions=res.data;
                    this.gotoOptions=res.data;
                }
            }
        })
    },
    // 批量指派操作
    assignedAllCustomerBtn(){
      this.assignedCount=[];
      this.assignedCountList=[];
      // console.log(this.multipleSelection)
      this.qeryStaffList();
      let vm = this ;
      vm.multipleSelection.forEach((item,index,arr) => {
          let obj={};
          obj.currentStaff=item.serviceName
          obj.customerPassport=item.userName
          vm.assignedCount.push(item.serviceName)
          vm.assignedCountList.push(obj)
      })

      vm.assignedCount=Array.from(new Set(vm.assignedCount));
    },
    // 提交部分指派
    submitAssignment(){
        let forceAllocParam = this.assignedCountList;
        let toStuff = this.assignedOptionsValue;
        getSubmitAssignment(toStuff,forceAllocParam).then((res)=>{
            if(res.msg=='success'){
                this.$message({
                  type: 'success',
                  message: '指派成功!'
                });
                this.dialogVisible=false;
                this.getCustomerList();
            }else{
                this.$message({
                  type: 'error',
                  message: res.msg
                });
            }
        })
    },
    // 提交全部指派
    submitAssignmentAll(){
        let fromStuff = this.fromOptionsValue;
        let toStuff = this.gotoOptionsValue;
        getSubmitAssignmentAll(fromStuff,toStuff).then((res)=>{
            if(res.msg=='success'){
                this.$message({
                  type: 'success',
                  message: '指派成功!'
                });
                this.dialogVisible=false;
                this.getCustomerList();
            }else{
                this.$message({
                  type: 'error',
                  message: res.msg
                });
            }
        })
    },
    // 表头筛选  专员   拨打
    filterChange(filters){
        filters.serviceName?this.customerParam.servceName=filters.serviceName:this.customerParam.servceName=[];
        filters.tag?this.customerParam.followupResult=filters.tag:this.customerParam.followupResult=[];
        console.log(this.customerParam.servceName)
        console.log(this.customerParam.followupResult)
        this.getCustomerList();
    },
    // 格式化时间
    setTime(time){
      return moment(time).format("YYYY.MM.DD HH:mm:ss")
    },

    // 改变时间
    // 改变注册时间
    changeRegist(val){
      console.log(val)
      val?this.customerParam.startRegisterDate=val[0]:this.customerParam.startRegisterDate='';//起始注册时间
      val?this.customerParam.endRegisterDate=val[1]:this.customerParam.endRegisterDate='';//截止注册时间
      this.getCustomerList();
    },
    // 改变跟进时间
    changeFollow(val){
      console.log(val)
      val?this.customerParam.startFollowupDate=val[0]:this.customerParam.startFollowupDate='';//起始跟进时间
      val?this.customerParam.endFollowupDate=val[1]:this.customerParam.endFollowupDate='';//截止跟进时间 
      this.getCustomerList();
    },
    // 改变成交时间
    changeClinchAdeal(val){
      console.log(val)
      val?this.customerParam.startDealDate=val[0]:this.customerParam.startDealDate='';//起始成交时间 
      val?this.customerParam.endDealDate=val[1]:this.customerParam.endDealDate='';//截止成交时间
      this.getCustomerList();
    },
    // 改变到期时间
    changeExpire(val){
        val?this.customerParam.startExpireDate=val[0]:this.customerParam.startExpireDate='';//开始到期时间
        val?this.customerParam.endExpireDate=val[1]:this.customerParam.endExpireDate='';//结束到期时间 
        this.getCustomerList();
    },
    // 搜索
    searchBtn(){
      this.customerParam.searchCondition=this.searcKey;
      this.customerParam.page=1;
      this.getCustomerList();
    },
    // 排序
    changeSort(column){
      // 排序方式 0 ASC 1 DESC 
      if(column.prop){
          this.customerParam.orders[0]={};
          if(column.order=="ascending"){
              this.customerParam.orders[0].direction=0;
          }else{
              this.customerParam.orders[0].direction=1;
          }
          this.customerParam.orders[0].ignoreCase=false;
          this.customerParam.orders[0].property=column.prop;
      }else{
          this.customerParam.orders=new Array();
      }
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
<style>
  .cursorter-table.el-table::before{
    height:0px;
  }
  .cursorter-table.el-table thead>tr>th{
    border-bottom: 1px solid #ebeef5;
  }
  .assignedCountBox{
    width:180px;
    display:inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .assignedCountBox span{
      margin-right:5px;
  }
</style>
