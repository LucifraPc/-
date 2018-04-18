<template>
	<transition name="slide-fade">
	    <div id="slide-window" v-if="showDetialBoxCon">
	    	<div class="slide-window-header">
	    		<h4>客户详情</h4>
	    		<i class="el-icon-close" @click="showDetialBoxConfalse();showDetialBoxCon=!showDetialBoxCon"></i>
	    	</div>

	        <el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="基本情况" name="基本情况">
			    	<el-form :model="customerDetail" :rules="rules" ref="customerDetail" label-width="100px" class="demo-ruleForm">
			    		<el-form-item label="通行证：" prop="username">
						    <span>{{customerDetail.username}}</span>
						</el-form-item>
						<el-form-item label="姓名：" prop="customerName">
						    <el-input v-model="customerDetail.customerName"></el-input>
						</el-form-item>
						<el-form-item label="手机号码：" prop="mobile">
						    <el-input v-model="customerDetail.mobile"></el-input>
						</el-form-item>
						<el-form-item label="QQ号：" prop="qq">
						    <el-input v-model="customerDetail.qq"></el-input>
						</el-form-item>
						<el-form-item label="注册时间：" prop="registedTime">
						    <span>{{customerDetail.registedTime/1000 | moment("YYYY-MM-DD HH:mm:ss")}}</span>
						</el-form-item>
						<el-form-item label="挖掘时间：" prop="registedTime">
						    <span>{{customerDetail.registedTime/1000 | moment("YYYY-MM-DD HH:mm:ss")}}</span>
						</el-form-item>
						<el-form-item label="跟进结果：" prop="classId">
						    <el-select v-model="customerDetail.classId" placeholder="请选择跟进结果">
						      	<el-option v-for="item in getCustomerClass" v-if="item.classId<90" :label="item.className" :value="item.classId" ></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="拨打结果：" prop="followupId">
						    <el-radio-group v-model="customerDetail.followupId">
						      	<el-radio v-for="item in followupList" :label="item.followupId">{{item.followup}}</el-radio>
						    </el-radio-group>
						</el-form-item>
						<el-form-item label="跟进说明：" prop="followupExplan">
						    <el-input type="textarea" v-model="customerDetail.followupExplan"  :rows="4"></el-input>
						</el-form-item>
						<el-form-item>
						    <el-button type="primary" @click="submitcustomerDetail('customerDetail')">提交</el-button>
						    <el-button @click="resetcustomerDetail('customerDetail')">取消</el-button>
						</el-form-item>
					</el-form>
					<hr style="height:1px;border:none;border-top:1px dashed #ccc;" />
					<div class="historyBox">
						<p>历史跟进记录</p>
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
			    	<div class="mealAllowancebox">
						<p>有效云套餐  (个人/企业)  ：(/)</p>
						<div>
							<p><span>套餐：鲁班钢筋云功能套餐</span><span>状态：有效</span><span>服务时间：2017-02-07~2018-02-06(剩余16天)</span></p>
							<p><span>套餐：鲁班钢筋云功能套餐</span><span>状态：有效</span><span>服务时间：2017-02-07~2018-02-06(剩余16天)</span></p>
							<p><span>套餐：鲁班钢筋云功能套餐</span><span>状态：有效</span><span>服务时间：2017-02-07~2018-02-06(剩余16天)</span></p>
						</div>
					</div>
					<hr style="height:1px;border:none;border-top:1px dashed #ccc;margin:30px 0px" />
					<div class="mealAllowancebox">
						<p>有效BIM套餐  (个人/企业)  ：(/)</p>
						<div>
							<p><span>套餐：鲁班钢筋云功能套餐</span><span>状态：有效</span><span>服务时间：2017-02-07~2018-02-06(剩余16天)</span></p>
							<p><span>套餐：鲁班钢筋云功能套餐</span><span>状态：有效</span><span>服务时间：2017-02-07~2018-02-06(剩余16天)</span></p>
							<p><span>套餐：鲁班钢筋云功能套餐</span><span>状态：有效</span><span>服务时间：2017-02-07~2018-02-06(剩余16天)</span></p>
						</div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="功能使用" name="功能使用">
			    	<div class="mealAllowancebox">
						<p>使用云功能次数  ：{{userCloudTimes}} 次</p>
						<div>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
						</div>
					</div>
					<hr style="height:1px;border:none;border-top:1px dashed #ccc;margin:30px 0px" />
					<div class="mealAllowancebox">
						<p>使用BIM应用次数  ：{{useBimTimes}} 次</p>
						<div>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
						</div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="订单记录" name="订单记录">
			    	<div v-show="topOrderList.length>0" v-if="$route.name=='成交客户' || $route.name=='即将到期客户' || $route.name=='到期未续费' ">
						<div class="mealAllowancebox">
							<p>已绑定订单：</p>
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
			    	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
							<p>已绑定订单：</p>
							<div>
								<!--bottomOrderList -->
								<p v-for="item in bottomOrderList">订单编号：{{item.outTradeOrderId}}</p>
							</div>
						</div>
					</div>
					
			    </el-tab-pane>
			    <el-tab-pane label="挖掘记录" name="挖掘记录">
			    	<el-table
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
	import {getCustomerDetail,getCustomerClassification,getCustomerFollowUpResult,getCustomerDetailSubmint,getCustomerOrder,getCustomerFunCount,getCustomerPackage,getCustomerMining,getCustomerOrderSearchNumber,bindingOrdersFun,delbindingOrdersFun} from '@/api/table.js'
	export default {
		props:["showDetialBox","passwordId"],
	    created(){
	    	this.getCustomerClassList();
	    	this.getCallList();
	    },
	    data() {
	      return {
	      	type:{// 客户分类结果集
		        "新客户": 0,
		        "高意向": 1,
		        "可跟进": 2,
		        "成交客户": 3,
		        "即将到期客户": -1,
		        "到期未续费": -2,
		        "无法接通": 4,
		        "无效线索": 5
		    },
		    callResult:{// 客户分类结果集
		        "null": "无",
		        "1": "接通",
		        "2": "未接",
		        "3": "关机",
		        "4": "无人接听",
		        "5": "停机",
		        "6": "空号",
		        "7": "使用其他软件",
		      },


	      	searchNum:'',
	        showDetialBoxCon:false,
	        activeName: '基本情况',

	        
	        getCustomerClass:[],// 客户分类跟进结果
	        followResult:[],//拨打类型


	        // 基本情况
	        customerDetail:{},
	        
			// 历史跟进记录
			followupLog: [],
			followupList:[],

	        ruleForm: {},
	        rules: {
	          classId: [
	            {   required: true,message: '请选择跟进结果', trigger: 'change' }
	          ]
	        },
	        tableData: [],
	        showDetialOrder:false,//订单详情
	        topOrderList:[],//上可点击订单
	        bottomOrderList:[],//下不可点击订单
	        invoicetype:{ // 发票类型 -1:不需要发票 0:普通发票 2:增值税专用发票 3:专用发票 ,
		        "-1":"不需要发票",
		        "0":"普通发票",
		        "2":"增值税专用发票",
		        "3":"专用发票 "
		    },
		    paytype:{// 支付方式，0网银 1支付宝 2银行电汇 3人工订单 4微信 ,
		        "0":"网银",
		        "1":"支付宝",
		        "2":"银行电汇",
		        "3":"人工订单",
		        "4":"微信"
		    },
		    paystatus:{// 支付状态，0 未支付。2 已支付到账, -1支付失败 -2 已取消,-3已退款 ,
		        "0":"未支付",
		        "2":"已支付到账" ,
		        "-1":"支付失败" ,
		        "-2":"已取消" ,
		        "-3":"已退款" 
		    },


	        userCloudTimes:0,
	        useBimTimes:0
	      }
	    },
	    watch: {
	    	// 监测弹窗key
	      	'showDetialBox':{
		      	handler(curVal){
		      		this.showDetialBoxCon=this.showDetialBox;
		      		this.activeName='基本情况';
		      		if(this.showDetialBox){
		      			this.getCustomerDetailFun();
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
	      	// 切换页签  获取数据
	      	handleClick(tab, event) {
		        if(this.activeName=='基本情况'){
		        	this.getCustomerDetailFun();
		        }else if(this.activeName=='套餐余量'){
		        	this.getCustomerPackageList();
		        }else if(this.activeName=='功能使用'){
		        	this.getCustomerFunCountList();
		        }else if(this.activeName=='订单记录'){
		        	this.getCustomerOrderList();
		        }else if(this.activeName=='挖掘记录'){
		        	this.getCustomerMiningList();
		        }
		    },
		    // 提交客户详情
		    submitcustomerDetail(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            	let submitCustomerDetailParam={
						  "customerName": this.customerDetail.customerName,
						  "customerType": this.customerDetail.classId,
						  "followupExplan": this.customerDetail.followupExplan?this.customerDetail.followupExplan:'',
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
				                this.getCustomerDetailFun();
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
		            	if(res.data.customerDetail){
		            		this.customerDetail=res.data.customerDetail;
		            	}
		            	if(this.followupLog){
		            		this.followupLog=res.data.followupLog;
		            	}
		                
		            }
		        })
	    	},
		    // 订单记录
		    getCustomerOrderList(){
		    	let username = this.passwordId;
		    	getCustomerOrder(username).then((res)=>{
		            if(res.msg=='success'){
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
		    // 挖掘记录
		    getCustomerMiningList(){
		    	let username = this.passwordId;
		    	getCustomerMining(username).then((res)=>{
		            if(res.msg=='success'){
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
		    	let username = this.passwordId;
		    	getCustomerPackage(username).then((res)=>{
		            if(res.msg=='success'){
		            	if(res.data){
		            		
		            	}
		            }else{
		            	this.$message({
			                type: 'error',
			                message: '获取失败!'
		                });
		            }
		        })
		    }
	    }
	}
</script>
<style>
	.floatRightBox{
		height:40px;
		line-height:40px;
	}
	.floatRight{
		float:right;
	}
	.floatRight span{
		margin:0px!important;
	}
	.select-clear .el-input-group__append{
		position:relative;
	}
	.select-clear .el-input-group__append .el-icon-circle-close{
		display: inline-block;
		font-size:16px;
		left:-22px;
		top:11px;
		color: #a5a5a5;
		position: absolute;
	}

</style>