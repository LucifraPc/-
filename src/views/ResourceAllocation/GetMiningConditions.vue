<template>
  <div class="app-container">
    <el-row class="el-row-wrap">
      <el-button size="small" round @click="backToPrevious" style="float:right;margin-top:5px">返回</el-button>
      <iframe id="mainFrame" name="mainFrame" scrolling="no" src="../../../static/dataMining/showCondition.html"
            frameborder="0" style="padding: 0px; width: 100%;"></iframe>
    </el-row>
  </div>
</template>
<script>
  export default {
    methods: {
      backToPrevious() {
        this.$router.push({
          path: `/resource-allocation/data-mining`
        });
      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scope>
</style>
