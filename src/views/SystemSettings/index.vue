<template>
    <div class="app-container cursorterBox">
          <div class="background-FFF padding-0">
              <bread-crumb></bread-crumb>
          </div>
          <el-card class="box-card margin-top-15">
              <div slot="header" class="clearfix">
                  <span>客户总数上限设置</span>
                  <el-button style="float: right; padding: 3px 0" type="text"  @click="settingsSave(1)">保存</el-button>
              </div>
              <el-form label-width="140px">
                <el-form-item label="持有客户总量：" class="label-top">
                    <p>每个电销坐席可持有的客户总量不得超过<el-input v-model="curtomerCount1" style="width:60px;margin:0px 10px;"></el-input>个客户，超过时，该坐席不可捞取客户，也不可接收新指派的客户保存后立即生效，超出数量限制的，将不可获得新客户</p>
                </el-form-item>
                <el-form-item label="参与计算的分类：">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedItem" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="item in getCustomerItem" :label="item.classId" :key="item.classId">{{item.className}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
              </el-form>
          </el-card>

          <el-card class="box-card margin-top-15">
              <div slot="header" class="clearfix">
                  <span>到期时间设置</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="settingsSave(2)">保存</el-button>
              </div>
              <el-form  label-width="140px">
                <el-form-item label="持有客户总量：" class="label-top">
                    <p>最近一个套餐到期时间与当前时间的差，小于<el-input v-model="curtomerCount2" style="width:60px;margin:0px 10px"></el-input>天时，算作到期客户以天为最小单位计算，每天凌晨2：00批处理，也保存后，第二天生效</p>
                </el-form-item>
              </el-form>
          </el-card>
          
          
    </div>
</template>

<script>
import {getSystemSettingsDetail,getSystemSettingsSave,getCustomerClassification} from '@/api/table.js'

export default {
  data() {
    return {
      form: {
      },
      checkAll: false,
      checkedItem: [],
      getCustomerClass:[],
      getCustomerItem: [],
      isIndeterminate: true,
      curtomerCount1:null,
      curtomerCount2:null,
    }
  },
  created() {
    this.getCustomerClassList();
    this.getSettingsDetail();
  },
  watch: {
  },
  methods: {
      //初始获取数据
      getSettingsDetail(){
          getSystemSettingsDetail().then((res)=>{
              if(res.msg=='success'){
                  
              }
          })
      },
      // 选择参与计算的分类
      handleCheckAllChange(val) {
        let id = [];
        this.getCustomerClass.forEach((item,index,arr) => {
            id.push(item.classId)
        })
        // console.log(id)
        this.checkedItem = val ? id : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.getCustomerItem.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.getCustomerItem.length;
      },

      // 保存
      settingsSave(status){
          let tsConfigSaveParam ={
            "comboExpiredays": status==1?'': this.curtomerCount2 ,  //套餐到期天数 ,
            "configType": status, //客户总数上限设置1,到期时间设置2 ,
            "customerNumbers":  status==1?this.curtomerCount1:'', //持有客户总量 ,
            "customerType": status==1?this.checkedItem:''//客户类型
          }
          getSystemSettingsSave(tsConfigSaveParam).then((res)=>{
              if(res.msg=='success'){
                  
              }
          })
      },
      // 获取跟进结果
      getCustomerClassList(){
        getCustomerClassification().then((res)=>{
          if(res.msg=='success'){
            if(res.data){
              this.getCustomerClass=res.data;
              this.getCustomerItem=this.getCustomerClass;
            }
          } 
        })
      }
  }
}
</script>
<style>
  
</style>



