<template>
	<transition name="slide-fade">
	    <div id="slide-window" v-if="showDetialBoxCon">
	    	<div class="slide-window-header">
	    		<h4>客户详情</h4>
	    		<i class="el-icon-close" @click="showDetialBoxConfalse();showDetialBoxCon=!showDetialBoxCon"></i>
	    	</div>

	        <el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="基本情况" name="first">
			    	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			    		<el-form-item label="通行证：" prop="name">
						    <span v-model="ruleForm.name"></span>
						</el-form-item>
						<el-form-item label="姓名：" prop="name">
						    <el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="手机号码：" prop="name">
						    <el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="QQ号：" prop="name">
						    <el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="注册时间：" prop="name">
						    <span v-model="ruleForm.name"></span>
						</el-form-item>
						<el-form-item label="挖掘时间：" prop="name">
						    <span v-model="ruleForm.name"></span>
						</el-form-item>
						<el-form-item label="跟进结果：" prop="region">
						    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
						      	<el-option label="区域一" value="shanghai"></el-option>
						      	<el-option label="区域二" value="beijing"></el-option>
						    </el-select>
						</el-form-item>
						<el-form-item label="拨打结果：" prop="resource">
						    <el-radio-group v-model="ruleForm.resource">
						      	<el-radio label="接通"></el-radio>
						      	<el-radio label="未接"></el-radio>
						      	<el-radio label="关机"></el-radio>
						      	<el-radio label="无人接通"></el-radio>
						      	<el-radio label="停机"></el-radio>
						      	<el-radio label="空错号"></el-radio>
						     	<el-radio label="使用其他软件"></el-radio>
						    </el-radio-group>
						</el-form-item>
						<el-form-item label="跟进说明：" prop="desc">
						    <el-input type="textarea" v-model="ruleForm.desc"  :rows="4"></el-input>
						</el-form-item>
						<el-form-item>
						    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
						    <el-button @click="resetForm('ruleForm')">取消</el-button>
						</el-form-item>
					</el-form>
					<hr style="height:1px;border:none;border-top:1px dashed #ccc;" />
					<div class="historyBox">
						<p>历史跟进记录</p>
						<div>
							<p><span>2018.3.1 15:10:03</span><span>高意向</span><span>接通</span></p>
							<p>这是一条跟进说明，长度很长很长。这是一条跟进说明，长度很长很长。这是一条跟进说明，长度很长很长。这是一条跟进说明，长度很长很长。这是一条跟进说明，长度很长很长</p>
						</div>
						<div>
							<p><span>2018.3.1 15:10:03</span><span>高意向</span><span>接通</span></p>
							<p>这是一条跟进说明，长度很长很长。这是一条跟进说明，长度很长很长。这是一条跟进说明，长度很长很长。这是一条跟进说明，长度很长很长。这是一条跟进说明，长度很长很长</p>
						</div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="套餐余量" name="second">
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
			    <el-tab-pane label="功能使用" name="third">
			    	<div class="mealAllowancebox">
						<p>使用云功能次数  ：5次</p>
						<div>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
						</div>
					</div>
					<hr style="height:1px;border:none;border-top:1px dashed #ccc;margin:30px 0px" />
					<div class="mealAllowancebox">
						<p>使用BIM应用次数  ：10次</p>
						<div>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
							<p><span>2018-01-17 13:48:30</span><span>重庆市(113.251.19.68)</span><span>生成平面图</span></p>
						</div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="订单记录" name="fourth">
			    	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			    		<el-form-item label="订单编号：" prop="name">
						    <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" style="width:390px;">
							    <el-button slot="append" icon="el-icon-search"></el-button>
							</el-input>
							<el-button type="primary">绑定订单</el-button>
						</el-form-item>
						<el-form-item label="下单时间：" prop="name">
						    <span v-model="ruleForm.name"></span>
						</el-form-item>
						<el-form-item label="订单金额：" prop="name">
						    <span v-model="ruleForm.name"></span>
						</el-form-item>
						<el-form-item label="支付方式：" prop="name">
						    <span v-model="ruleForm.name"></span>
						</el-form-item>
						<el-form-item label="支付状态：" prop="name">
						    <span v-model="ruleForm.name"></span>
						</el-form-item>
						<el-form-item label="发票类型：" prop="name">
						    <span v-model="ruleForm.name"></span>
						</el-form-item>
						<el-form-item label="购买内容：" prop="name">
						    <span v-model="ruleForm.name"></span>
						</el-form-item>
					</el-form>
					<hr style="height:1px;border:none;border-top:1px dashed #ccc;margin:30px 0px" />
					<div class="mealAllowancebox">
						<p>已绑定订单：</p>
						<div>
							<p>订单编号：2017101607024915</p>
							<p>订单编号：2017101607024915</p>
							<p>订单编号：2017101607024915</p>
							<p>订单编号：2017101607024915</p>
						</div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="挖掘记录" name="five">
			    	<el-table
					    :data="tableData"
					    border
					    style="width: 100%">
					    <el-table-column
					      prop="date"
					      label="日期"
					      width="180">
					    </el-table-column>
					    <el-table-column
					      prop="name"
					      label="姓名"
					      width="180">
					    </el-table-column>
					    <el-table-column
					      prop="address"
					      label="地址">
					    </el-table-column>
					</el-table>
			    </el-tab-pane>
			</el-tabs>
	    </div>
  	</transition>
</template>
<script>
	export default {
		props:["showDetialBox"],
	    created(){
	    },
	    data() {
	      return {
	      	input5:'',
	        showDetialBoxCon:false,
	        activeName: 'first',

	        ruleForm: {
	          name: '',
	          region: '',
	          date1: '',
	          date2: '',
	          delivery: false,
	          type: [],
	          resource: '',
	          desc: ''
	        },
	        rules: {
	          region: [
	            {   required: true,message: '请选择活动区域', trigger: 'change' }
	          ]
	        },
	        tableData: [{
	          date: '2016-05-02',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1518 弄'
	        }, {
	          date: '2016-05-04',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1517 弄'
	        }, {
	          date: '2016-05-01',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1519 弄'
	        }, {
	          date: '2016-05-03',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1516 弄'
	        }]
	      }
	    },
	    watch: {
	      	'showDetialBox':{
		      	handler(curVal){
		      		this.showDetialBoxCon=this.showDetialBox;
		      	}
	      	}
	    },
	    methods: {
	      	showDetialBoxConfalse(){
	      		this.$emit('showDetialBoxConfalse',false);
	      	},
	      	handleClick(tab, event) {
		        console.log(tab, event);
		    },
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            alert('submit!');
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    resetForm(formName) {
		        this.$refs[formName].resetFields();
		    }
	    }
	}
</script>