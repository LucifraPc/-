<template>
  <div class="app-container">
    <el-row class="el-row-wrap">
      <el-button size="small" round @click="backToPrevious" style="float:right;margin-top:5px">返回</el-button>
      <iframe id="mainFrame" name="mainFrame" scrolling="no" :src="src" frameborder="0" style="padding: 0px; width: 100%;"></iframe>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        miningId: '',
        src: '../../../static/dataMining/showCondition.html'
      }
    },
    methods: {
      backToPrevious() {
        this.$router.push({
          path: `/resource-allocation/data-mining`
        });
      }
    },
    mounted() {
      window.mainFrame.miningId = this.$route.params.id;
      window.miningId=this.$route.params.id
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scope>


</style>
