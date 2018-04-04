<template>
  <div class="app-container">
    <el-row style="margin-bottom:15px;" class="background-FFF padding-10">
          <!-- 搜索 -->
          <el-col :span="24">
              <bread-crumb style="float:left;line-height:40px"></bread-crumb>
              <el-input class="search-input-box"
                placeholder="请输入通行证/姓名/手机号/QQ号搜索">
                <i slot="prefix" class="el-input__icon el-icon-circle-close"></i>
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

