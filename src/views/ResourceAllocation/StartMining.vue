<template>
  <div class="app-container">
    <el-row class="el-row-wrap">
      <el-button size="small" round @click="backToPrevious" style="float:right;margin-top:5px">返回</el-button>
      <iframe src="/static/dataMining/searchStart.html" frameborder="0" style="width:100%;height:80vh"></iframe>
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
    },
    mounted() {
      window.basePath = process.env.BASE_API;
      console.log(this.$route,'startmining')
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scope>


</style>
