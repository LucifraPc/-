<template>
    <div class="app-container cursorterBox">
          <div class="background-FFF padding-0">
              <bread-crumb></bread-crumb>
          </div>
          <el-card class="box-card margin-top-15">
              <div slot="header" class="clearfix">
                  <span>客户总数上限设置</span>
                  <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
              </div>
              <el-form ref="form" :model="form" label-width="140px">
                <el-form-item label="持有客户总量：" class="label-top">
                    <p>每个电销坐席可持有的客户总量不得超过<el-input v-model="curtomerCount" style="width:60px;margin:0px 10px;"></el-input>个客户，超过时，该坐席不可捞取客户，也不可接收新指派的客户保存后立即生效，超出数量限制的，将不可获得新客户</p>
                </el-form-item>
                <el-form-item label="参与计算的分类：">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
              </el-form>
          </el-card>

          <el-card class="box-card margin-top-15">
              <div slot="header" class="clearfix">
                  <span>到期时间设置</span>
                  <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
              </div>
              <el-form ref="form" :model="form" label-width="140px">
                <el-form-item label="持有客户总量：" class="label-top">
                    <p>最近一个套餐到期时间与当前时间的差，小于<el-input v-model="curtomerCount" style="width:60px;margin:0px 10px"></el-input>天时，算作到期客户以天为最小单位计算，每天凌晨2：00批处理，也保存后，第二天生效</p>
                </el-form-item>
              </el-form>
          </el-card>
          
          
    </div>
</template>

<script>
const cityOptions = ['新客户', '高意向', '可跟进', '成交客户','即将到期客户', '到期未续费', '无人接听', '无法接通', '无效线索'];
export default {
  data() {
    return {
      form: {
      },
      checkAll: false,
      checkedCities: ['新客户', '可跟进'],
      cities: cityOptions,
      isIndeterminate: true,
      curtomerCount:null,
    }
  },
  created() {
  },
  watch: {
  },
  methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
  }
}
</script>
<style>
  
</style>



