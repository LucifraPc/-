<template>
  <transition name="slide-fade">
    <div id="slide-window" v-if="showDetialBoxCon">
      <div class="slide-window-header">
        <h4>客户详情</h4>
        <i class="el-icon-close" @click="showDetialBoxConfalse();showDetialBoxCon=!showDetialBoxCon"></i>
      </div>

	        <el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="基本情况" name="基本情况">
			    	<el-form v-loading="loading" element-loading-text="拼命加载中..." :model="customerDetail" :rules="rules" ref="customerDetail" label-width="100px" class="demo-ruleForm">
			    		<el-form-item label="通行证：" prop="username">
						    <span>{{customerDetail.username}}</span>
						</el-form-item>
						<el-form-item label="姓名：" prop="customerName">
						    <el-input v-if="$route.name!=='客户公海'" v-model="customerDetail.customerName"></el-input>
						    <span v-else>{{customerDetail.customerName}}</span>
						</el-form-item>
						<el-form-item label="手机号码：" prop="mobile">
						    <el-input v-if="$route.name!=='客户公海'" v-model="customerDetail.mobile"></el-input>
						    <span v-else>{{customerDetail.mobile}}</span>
						</el-form-item>
						<el-form-item label="QQ号：" prop="qq">
						    <el-input v-if="$route.name!=='客户公海'" v-model="customerDetail.qq"></el-input>
						    <span v-else>{{customerDetail.qq}}</span>
						</el-form-item>
						<el-form-item label="注册时间：" prop="registedTime">
						    <span>{{customerDetail.registedTime==0 ?'-':customerDetail.registedTime/1000 | moment("YYYY-MM-DD HH:mm:ss")}}</span>
						</el-form-item>
						<el-form-item label="挖掘时间：" prop="nearestDMTime">
						    <span>{{customerDetail.nearestDMTime==0?'-':customerDetail.nearestDMTime/1000 | moment("YYYY-MM-DD HH:mm:ss")}}</span>
						</el-form-item>
						<el-form-item label="跟进结果：" prop="classId" v-if="$route.name!=='客户公海'">
						    <el-select v-model="customerDetail.classId" placeholder="请选择跟进结果">
						      	<el-option v-for="(item,i) in getCustomerClass" :key='i' v-show="item.classId!=0" v-if="item.classId<90" :label="item.className" :value="item.classId" ></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="拨打结果：" prop="followupId" v-if="$route.name!=='客户公海'">
						    <el-radio-group v-model="customerDetail.followupId">
						      	<el-radio v-for="(item,i) in followupList" :key='i' :label="item.followupId">{{item.followup}}</el-radio>
						    </el-radio-group>
						</el-form-item>
						<el-form-item label="跟进说明：" prop="followupExplan" v-if="$route.name!=='客户公海'">
						    <el-input type="textarea" v-model="customerDetail.followupExplan"  :rows="4"></el-input>
						</el-form-item>
						<el-form-item v-if="$route.name!=='客户公海'">
						    <el-button type="primary" @click="submitcustomerDetail('customerDetail')">提交</el-button>
						    <el-button @click="resetcustomerDetail('customerDetail')">取消</el-button>
						</el-form-item>
					</el-form>
					<hr style="height:1px;border:none;border-top:1px dashed #ccc;" />
					<div class="historyBox">
						<p class="fontW">历史跟进记录</p>
						<div  v-if="followupLog.length>0" style="max-height: 300px;overflow-y: auto">
							<div  v-for="item in followupLog">
								<p><span>{{item.followupTime/1000 | moment("YYYY-MM-DD HH:mm:ss")}}</span><span>{{item.classId}}</span><span>{{callResult[item.followupId]}}</span></p>
								<p>{{item.followupExplain}}</p>
							</div>
						</div>
						<div v-else style="text-align:center;">无跟进记录</div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="套餐余量" name="套餐余量">
			    	<div v-loading="loading" element-loading-text="拼命加载中...">
				    	<div class="mealAllowancebox">
							<p class="fontW">有效云套餐  (个人)  ：({{allowanceCloud.length}})</p>
							<div>
								<p v-for="item in allowanceCloud">
									<span class="width168 ellipsis" :title="item.packageServiceName">套餐：{{item.packageServiceName}}</span>
									<span class="width70 ellipsis">状态：{{allowanceStatus[item.status]}}</span>
									<span class="width290 ellipsis" :title="'剩余'+changeTimeDifference(item.startTime,item.endTime)+'天'">服务时间：{{item.startTime/1000 | moment("YYYY-MM-DD")}}~{{item.endTime/1000 | moment("YYYY-MM-DD")}}(剩余{{changeTimeDifference(item.startTime,item.endTime)}}天)</span>
								</p>
							</div>
						</div>
						<hr style="height:1px;border:none;border-top:1px dashed #ccc;margin:30px 0px" />
						<div class="mealAllowancebox">
							<p class="fontW">有效BIM套餐  (个人)  ：({{allowanceBim.length}})</p>
							<div>
								<p v-for="item in allowanceBim">
									<span class="width168 ellipsis" :title="item.packageServiceName">套餐：{{item.packageServiceName}}</span>
									<span class="width70 ellipsis">状态：{{allowanceStatus[item.status]}}</span>
									<span class="width290 ellipsis" :title="'剩余'+changeTimeDifference(item.startTime,item.endTime)+'天'">服务时间：{{item.startTime/1000 | moment("YYYY-MM-DD")}}~{{item.endTime/1000 | moment("YYYY-MM-DD")}}(剩余{{changeTimeDifference(item.startTime,item.endTime)}}天)</span>
								</p>
							</div>
						</div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="功能使用" name="功能使用">
			    	<div v-loading="loading" element-loading-text="拼命加载中...">
				    	<div class="mealAllowancebox">
							<p class="fontW">使用云功能次数  ：{{userCloudTimes}} 次</p>
							<div>
								<p v-for="(item,i) in customerFunctionLog1"><span>{{item.usingTime/1000 | moment("YYYY-MM-DD HH:mm:ss")}}</span><span>{{item.city}}({{item.ip}})</span><span>{{item.functionType}}</span><span>{{item.functionName}}</span></p>
							</div>
						</div>
						<!-- 分页 -->
			          	<div class="block" v-show="customerFunctionLog1.length>0" style="text-align: center;margin-top:20px;">
				            <el-pagination
				                @size-change="handleSizeChange1"
				                @current-change="handleCurrentChange1"
				                :current-page="cstomerFunctionLogParam1.page"
				                :page-size="cstomerFunctionLogParam1.size"
				                layout="total, prev, pager, next"
				                :total="totalElements1">
				            </el-pagination>
			          	</div>
						<hr style="height:1px;border:none;border-top:1px dashed #ccc;margin:30px 0px" />
						<div class="mealAllowancebox">
							<p class="fontW">使用BIM应用次数  ：{{useBimTimes}} 次</p>
							<div>
								<p v-for="(item,i) in customerFunctionLog2"><span>{{item.usingTime/1000 | moment("YYYY-MM-DD HH:mm:ss")}}</span><span>{{item.city}}({{item.ip}})</span><span>{{item.functionType}}</span><span>{{item.functionName}}</span></p>
							</div>
						</div>
						<!-- 分页 -->
			          	<div class="block" v-show="customerFunctionLog2.length>0" style="text-align: center;margin-top:20px;">
				            <el-pagination
				                @size-change="handleSizeChange2"
				                @current-change="handleCurrentChange2"
				                :current-page="cstomerFunctionLogParam2.page"
				                :page-size="cstomerFunctionLogParam2.size"
				                layout="total, prev, pager, next"
				                :total="totalElements2">
				            </el-pagination>
			          	</div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="订单记录" name="订单记录">
			    	<div v-loading="loading" element-loading-text="拼命加载中...">
				    	<div v-show="topOrderList.length>0" v-if="$route.name=='成交客户' || $route.name=='即将到期客户' || $route.name=='到期未续费' ">
							<div class="mealAllowancebox">
								<p class="fontW">已绑定订单：</p>
								<div >  
								 <!-- topOrderList -->
								 	<p class="floatRightBox" v-for="item in topOrderList">
								 		订单编号：<span style="cursor: pointer;color:#409EFF" @click="searchNumBtn(item.outTradeOrderId)">{{item.outTradeOrderId}}</span>	 	
								 		<el-button type="primary floatRight" @click="delBindOrder(item.outTradeOrderId)">解除绑定</el-button></p>
								 	</p>
								</div>
							</div>
							<hr style="height:1px;border:none;border-top:1px dashed #ccc;margin:30px 0px" />
						</div>
				    	<el-form v-if="$route.name!=='客户公海'" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				    		<el-form-item label="订单编号：" prop="name">
							    <el-input placeholder="请输入内容" v-model="searchNum" class="input-with-select select-clear" style="width:390px;">
							    	<i slot="append" class="el-icon-circle-close" v-show="searchNum.length>0" @click="searchNum='';"></i>
								    <el-button slot="append" icon="el-icon-search" @click="searchNumBtn(searchNum)"></el-button>
								</el-input>
								<el-button type="primary" :disabled="!showDetialOrder" @click="bindingOrders">绑定订单</el-button>
							</el-form-item>
							<div v-show="showDetialOrder">
								<el-form-item label="下单时间：" prop="postTime">
							    	<span>{{ruleForm.postTime/1000 | moment("YYYY-MM-DD HH:mm:ss")}}</span>
								</el-form-item>
								<el-form-item label="订单金额：" prop="orderPrice">
								    <span>￥{{ruleForm.orderPrice}}</span>
								</el-form-item>
								<el-form-item label="支付方式：" prop="paymentMethod">
								    <span>{{paytype[ruleForm.paymentMethod]}}</span>
								</el-form-item>
								<el-form-item label="支付状态：" prop="paymentStatus">
								    <span>{{paystatus[ruleForm.paymentStatus]}}</span>
								</el-form-item>
								<el-form-item label="发票类型：" prop="invoiceType">
								    <span>{{invoicetype[ruleForm.invoiceType]}}</span>
								</el-form-item>
								<el-form-item label="购买内容：" prop="content">
								    <div style="margin-bottom:10px" v-for="item in ruleForm.content">{{item}}</div>
								</el-form-item>
							</div>
						</el-form>
						<div v-show="bottomOrderList.length>0" v-if="$route.name=='新客户' || $route.name=='高意向' || $route.name=='可跟进'|| $route.name=='无法接通'|| $route.name=='无效线索' || $route.name=='客户公海' " >
							<hr style="height:1px;border:none;border-top:1px dashed #ccc;margin:30px 0px" />
							<div class="mealAllowancebox" >
								<p class="fontW">已绑定订单：</p>
								<div>
									<!--bottomOrderList -->
									<p v-for="item in bottomOrderList">订单编号：{{item.outTradeOrderId}}</p>
								</div>
							</div>
						</div>
						<div v-if="bottomOrderList.length<1 && $route.name=='客户公海'" style="text-align:center;line-height:100px;">暂无数据</div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="挖掘记录" name="挖掘记录">
			    	<el-table v-loading="loading" element-loading-text="拼命加载中..."
					    :data="tableData"
					    border
					    style="width: 100%">
					    <el-table-column
					      prop="dmtime"
					      label="挖掘时间"
					      width="180">
					      <template slot-scope="scope">{{ scope.row.dmtime/1000 |moment("YYYY-MM-DD HH:mm:ss") }}</template>
					    </el-table-column>
					    <el-table-column
					      prop="dmname"
					      label="挖掘任务名称"
					      >
					    </el-table-column>
					    <el-table-column
					      prop="operator"
					      label="操作人"
					      width="180">
					    </el-table-column>
					</el-table>
			    </el-tab-pane>
			</el-tabs>
	    </div>
  	</transition>
</template>
<script>
  import {
    getCustomerDetail,
    getCustomerClassification,
    getCustomerFollowUpResult,
    getCustomerDetailSubmint,
    getCustomerOrder,
    getCustomerFun,
    getCustomerFunCount,
    getCustomerPackage,
    getCustomerMining,
    getCustomerOrderSearchNumber,
    bindingOrdersFun,
    delbindingOrdersFun
  } from '@/api/table.js'

  import moment from 'moment'
  export default {
    props: ["showDetialBox", "passwordId"],
    created() {
      this.getCustomerClassList();
      this.getCallList();
    },
    data() {
	      	var checkMobile = (rule, value, callback) => {
	        	if (!(/^1[0-9]{10}$/.test(value))) {
	          		callback(new Error('请输入正确的手机号'));
	        	} else {
	         	 callback();
	        	}
	      	};
	      	var checkQQ = (rule, value, callback) => {
	      		if(value!=""){
	      			if (!(/^[1-9][0-9]{4,14}$/.test(value))) {
		          		callback(new Error('请输入正确的qq号'));
		        	} else {
		         	 callback();
		        	}
	      		}else{
	      			callback();
	      		}
	        	
	      	};

	      	
	      	return {
		        loading: true,
		        type: { // 客户分类结果集
		          "新客户": 1,
		          "高意向": 2,
		          "可跟进": 3,
		          "成交客户": 4,
		          "即将到期客户": -1,
		          "到期未续费": -2,
		          "无法接通": 5,
		          "无效线索": 6
		        },
		        callResult: { // 客户分类结果集
		          "0": "无",
		          "1": "接通",
		          "2": "未接",
		          "3": "关机",
		          "4": "无人接听",
		          "5": "停机",
		          "6": "空号",
		          "7": "使用其他软件",
		        },


		        searchNum: '',
		        showDetialBoxCon: false,
		        activeName: '基本情况',


		        getCustomerClass: [], // 客户分类跟进结果
		        followResult: [], //拨打类型


		        // 基本情况
		        customerDetail: {},

		        // 历史跟进记录
		        followupLog: [],
		        followupList: [],

		        ruleForm: {},
		        rules: {
		          classId: [{
		            required: true,
		            message: '请选择跟进结果',
		            trigger: 'change'
		          }],
		          customerName: [{
		            required: true,
		            message: '请输入姓名',
		            trigger: 'change'
		          }],
		          followupId: [{
		            required: true,
		            message: '请选择拨打结果',
		            trigger: 'change'
		          }],
		          followupExplan: [{
		            required: true,
		            message: '请输入说明',
		            trigger: 'change'
		          }],
		          mobile: [{
		              required: true,
		              message: '请输入手机号',
		              trigger: 'blur'
		            },
		            {
		              validator: checkMobile,
		              trigger: 'blur'
		            },
		          ],
		          qq: [
		            {
		              validator: checkQQ,
		              trigger: 'blur'
		            },
		          ]
		        },
		        tableData: [],
		        showDetialOrder: false, //订单详情
		        topOrderList: [], //上可点击订单
		        bottomOrderList: [], //下不可点击订单
		        invoicetype: { // 发票类型 -1:不需要发票 0:普通发票 2:增值税专用发票 3:专用发票 ,
		          "-1": "不需要发票",
		          "0": "普通发票",
		          "2": "增值税专用发票",
		          "3": "专用发票 "
		        },
		        paytype: { // 支付方式，0网银 1支付宝 2银行电汇 3人工订单 4微信 ,
		          "0": "网银",
		          "1": "支付宝",
		          "2": "银行电汇",
		          "3": "人工订单",
		          "4": "微信"
		        },
		        paystatus: { // 支付状态，0 未支付。2 已支付到账, -1支付失败 -2 已取消,-3已退款 ,
		          "0": "未支付",
		          "2": "已支付到账",
		          "-1": "支付失败",
		          "-2": "已取消",
		          "-3": "已退款"
		        },
		        // 功能使用
		        userCloudTimes:0,
		        useBimTimes:0,
		        customerFunctionLog1:[],
		        customerFunctionLog2:[],
		        totalElements1:0,
		        totalElements2:0,

			    // 套餐余量
			    allowanceCloud:[],
			    allowanceBim:[],
			    allowanceStatus:{//套餐状态0:已过期 1:有效,2:未生效
			        "0":"已过期",
			        "1":"有效" ,
			        "2":"未生效"
			    },
			    cstomerFunctionLogParam1:{
				  "customerName": "",//客户通行证名
				  "functionType": 2,//功能类型 2云功能 12 bim应用 ,
				  "page": 1,
				  "size": 10,
				},
				cstomerFunctionLogParam2:{
				  "customerName": "",//客户通行证名
				  "functionType": 12,//功能类型 2云功能 12 bim应用 ,
				  "page": 1,
				  "size": 10,
				}
	    	}
	    },
	    watch: {
	    	// 监测弹窗key
	      	'showDetialBox':{
		      	handler(curVal){
		      		this.showDetialBoxCon=this.showDetialBox;
		      		this.activeName='基本情况';
		      		if(this.showDetialBox){
		      			this.loading=true;
		      			this.getCustomerDetailFun();
		      			this.customerDetail={};
		      		}
		      	}
	      	},
	      	// 监测切换客户key
	      	'passwordId':{
	      		handler(curVal){
	      			this.activeName='基本情况';
		      		// this.getCustomerDetailFun();
		      	}
	      	}
	    },
	    methods: {
	    	// 分页操作功能使用
		    handleSizeChange1(val) {
		      // console.log(`每页 ${val} 条`);
		      this.cstomerFunctionLogParam1.size=val;
		      this.getCustomerFunList(this.cstomerFunctionLogParam1);
		    },
		    handleCurrentChange1(val) {
		      // console.log(`当前页: ${val}`);
		      this.cstomerFunctionLogParam1.page=val;
		      this.getCustomerFunList(this.cstomerFunctionLogParam1);
		    },
		    handleSizeChange2(val) {
		      // console.log(`每页 ${val} 条`);
		      this.cstomerFunctionLogParam2.size=val;
		      this.getCustomerFunList(this.cstomerFunctionLogParam2);
		    },
		    handleCurrentChange2(val) {
		      // console.log(`当前页: ${val}`);
		      this.cstomerFunctionLogParam2.page=val;
		      this.getCustomerFunList(this.cstomerFunctionLogParam2);
		    },
	    	// 获取跟进结果
	    	getCustomerClassList(){
	    		getCustomerClassification().then((res)=>{
		    		if(res.msg=='success'){
		    			if(res.data){
		    				this.getCustomerClass=res.data;
		    			}
		    		}	
		    	})
	    	},
	    	// 初始化获取拨打结果筛选
		    getCallList(){
		        let vthis=this;
		        getCustomerFollowUpResult().then((res)=>{
		            if(res.msg=='success'){
		              if(res.data){
		                this.followupList=res.data;
		              }
		            }
		        })
		    },
	    	// 关闭弹窗传值给父组件
	    	showDetialBoxConfalse(){
	      		this.$emit('showDetialBoxConfalse',false);
	      	},
	      	changeListView(){
	      		this.$emit('changeListView',true);
	      	},
	      	// 切换页签  获取数据
	      	handleClick(tab, event) {
	      		this.loading=true;
		        if(this.activeName=='基本情况'){
		        	this.getCustomerDetailFun();
		        }else if(this.activeName=='套餐余量'){
		        	this.getCustomerPackageList();
		        }else if(this.activeName=='功能使用'){
		        	this.cstomerFunctionLogParam1.customerName="";
		        	this.cstomerFunctionLogParam1.functionType=2;
		        	this.cstomerFunctionLogParam1.page=1;
		        	this.cstomerFunctionLogParam1.size=10;

		        	this.cstomerFunctionLogParam2.customerName="";
		        	this.cstomerFunctionLogParam2.functionType=2;
		        	this.cstomerFunctionLogParam2.page=1;
		        	this.cstomerFunctionLogParam2.size=10;


		        	this.getCustomerFunCountList();
		        	this.getCustomerFunList(this.cstomerFunctionLogParam1);
		        	this.getCustomerFunList(this.cstomerFunctionLogParam2);


		        }else if(this.activeName=='订单记录'){
		        	this.getCustomerOrderList();
		        }else if(this.activeName=='挖掘记录'){
		        	this.getCustomerMiningList();
		        }
		    },
		    // 提交客户详情
		    submitcustomerDetail(formName) {
		   //  	if(this.customerDetail.followupExplan==" "){
					// this.customerDetail.followupExplan="";
		   //  	}
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            	let submitCustomerDetailParam={
						  "customerName": this.customerDetail.customerName,
						  "customerType": this.customerDetail.classId,
						  "followupExplan": this.customerDetail.followupExplan,
						  "followupId": this.customerDetail.followupId,
						  "mobile": this.customerDetail.mobile,
						  "qq": this.customerDetail.qq,
						  "userName": this.passwordId
						}
						getCustomerDetailSubmint(submitCustomerDetailParam).then((res)=>{
				            if(res.msg=='success'){
				            	this.$message({
					                type: 'success',
					                message: '修改成功!'
				                });
				                this.$refs[formName].resetFields();
				                this.getCustomerDetailFun();
				                this.changeListView();

				            }else{
				            	this.$message({
					                type: 'error',
					                message: '修改失败!'
				                });
				            }
				        })
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    resetcustomerDetail(formName) {
		        // this.$refs[formName].resetFields();
		    },
		    // 根据编号搜索订单
		    searchNumBtn(searchNum){
		    	if(searchNum!=''){
		    		let orderMsg=searchNum;
		    		this.getCustomerOrderSearchNumberMsg(orderMsg);
		    	}
		    },
		    // 绑定订单
		    bindingOrders(){
		    	let username = this.passwordId;
		    	let oid = this.searchNum;
		    	if(username!='' && oid!=''){
		    		bindingOrdersFun(username,oid).then((res)=>{
			            if(res.msg=='success'){
			            	this.$message({
				                type: 'success',
				                message: '绑定成功!'
			                });
			                this.getCustomerOrderList();
			            }else{
			            	this.$message({
				                type: 'error',
				                message: res.msg
			                });
			            }
			        })
		    	}
		    	
		    },
		    // 解除绑定
		    delBindOrder(oid){
		    	let username = this.passwordId;
		    	delbindingOrdersFun(username,oid).then((res)=>{
		            if(res.msg=='success'){
		            	this.$message({
			                type: 'success',
			                message: '解除绑定成功!'
		                });
		                this.getCustomerOrderList();
		            }else{
		            	this.$message({
			                type: 'error',
			                message: res.msg
		                });
		            }
			    })
		    },
		    // 获取订单详情
		    getCustomerOrderSearchNumberMsg(orderMsg){
		    	getCustomerOrderSearchNumber(orderMsg).then((res)=>{
		            if(res.msg=='success'){
		            	if(res.data){
		            		this.ruleForm=res.data;
		            		this.showDetialOrder=true;
		            	}
		            }else{
		            	this.$message({
			                type: 'error',
			                message: res.msg
		                });
		            }
		        })
		    },
		    // 获取基本情况
	    	getCustomerDetailFun(){
	    		getCustomerDetail(this.passwordId).then((res)=>{
		            if(res.msg=='success'){
		            	this.loading=false;
		            	if(res.data.customerDetail){
		            		this.customerDetail=res.data.customerDetail;
		            		this.customerDetail.nearestDMTime=res.data.nearestDMTime;
		            		if(this.customerDetail.followupId==0){
		            			this.customerDetail.followupId=1;
		            		}
		            	}else{
		            		this.customerDetail.registedTime=0;
		            		this.customerDetail.followupId=1;
		            	}
		            	if(this.followupLog){
		            		this.followupLog=res.data.followupLog;
		            	}

		            	// this.customerDetail.followupExplan=null;
		            	// this.customerDetail.followupExplan=" ";
		            }else{
		            	this.$message({
			                type: 'error',
			                message: res.msg
		                });
		            }
		        })
	    	},
		    // 订单记录
		    getCustomerOrderList(){
		    	let username = this.passwordId;
		    	getCustomerOrder(username).then((res)=>{
		            if(res.msg=='success'){
		            	this.loading=false;
		            	if(res.data){
		            		this.topOrderList=res.data;//上可点击订单
	        				this.bottomOrderList=res.data;//下不可点击订单
		            	}
		            }else{
		            	this.$message({
			                type: 'error',
			                message: '查询失败!'
		                });
		            }
		        })
		    },
		    // 功能使用
		    getCustomerFunCountList(){
		    	let username = this.passwordId;
		    	getCustomerFunCount(username).then((res)=>{
		            if(res.msg=='success'){
		            	this.loading=false;
		            	if(res.data){
		            		this.userCloudTimes=res.data.userCloudTimes;
		            		this.useBimTimes=res.data.useBimTimes;
		            	}
		            }else{
		            	this.$message({
			                type: 'error',
			                message: '查询失败!'
		                });
		            }
		        })

		    },
		    // 分页查询功能日志
		    getCustomerFunList(cstomerFunctionLogParam){
		    	cstomerFunctionLogParam.customerName = this.passwordId;
		    	getCustomerFun(cstomerFunctionLogParam).then((res)=>{
		    		// alert(cstomerFunctionLogParam.functionType)
		            if(res.msg=='success'){
		            	this.loading=false;
		            	if(cstomerFunctionLogParam.functionType==2){
		            		this.totalElements1=res.data.totalElements;
		            		this.customerFunctionLog1=res.data.content;
		            		// console.log(this.customerFunctionLog1)
		            	}
		            	if(cstomerFunctionLogParam.functionType==12){
		            		this.totalElements2=res.data.totalElements;
		            		this.customerFunctionLog2=res.data.content;
		            		// console.log(this.customerFunctionLog2)
		            	}
		            }else{
		            	this.$message({
			                type: 'error',
			                message: '查询失败!'
		                });
		            }
		        })
		    },
		    // 挖掘记录
		    getCustomerMiningList(){
		    	let username = this.passwordId;
		    	getCustomerMining(username).then((res)=>{
		            if(res.msg=='success'){
		            	this.loading=false;
		            	if(res.data){
		            		this.tableData=res.data;
		            	}
		            }else{
		            	this.$message({
			                type: 'error',
			                message: '获取失败!'
		                });
		            }
		        })
		    },
		    // 套餐余量
		    getCustomerPackageList(){
		    	// 套餐类型：1 绑定锁套餐  2 vip套餐  5 普通套餐  6 正版套餐  7 线上套餐 8 线下套餐 9绑定锁绑定电脑并存的套餐（新11g） 11 鲁班库套餐 12 BIM应用套餐  13 材价 14 钢筋图集套餐 15 PDS云存储套餐 16个人pds应用套餐（暂时用2特殊处理）
		    	let username = this.passwordId;
		    	this.allowanceBim=new Array();
		    	this.allowanceCloud=new Array();
		    	let vm=this;
		    	getCustomerPackage(username).then((res)=>{
		            if(res.msg=='success'){
		            	this.loading=false;
		            	if(res.data){
		            		res.data.forEach(function (item) {
		            			// item.startTime = item.startTime.replace('年', '-').replace('月', '-').replace('日', '')
								// item.endTime = item.endTime.replace('年', '-').replace('月', '-').replace('日', '')
		            			// console.log(item.packageType)
								if(item.packageType==12){
									vm.allowanceBim.push(item)
								}
								if(item.packageType==16){
									vm.allowanceCloud.push(item)
								}
							});
		            	}
		            }else{
		            	this.$message({
			                type: 'error',
			                message: '获取失败!'
		                });
		            }
		        })
		    },
		    // 时间差
		    changeTimeDifference(time1,time2){
		    	console.log(time1,time2)
		    	return moment(time1).diff(time2, 'days');
		    }
	    }
	}
</script>
<style>
  .floatRightBox {
    height: 40px;
    line-height: 40px;
  }

  .floatRight {
    float: right;
  }

  .floatRight span {
    margin: 0px !important;
  }

  .select-clear .el-input-group__append {
    position: relative;
  }

  .select-clear .el-input-group__append .el-icon-circle-close {
    display: inline-block;
    font-size: 16px;
    left: -22px;
    top: 11px;
    color: #a5a5a5;
    position: absolute;
  }

</style>
