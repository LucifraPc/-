<template>
  <div class="app-container">
    <el-row class="el-row-wrap">
      <el-button size="small" round @click="backToPrevious" style="float:right;margin-top:5px" v-show="isShowBack">返回</el-button>
      <iframe id="mainFrame" name="mainFrame" scrolling="no" :src="src" frameborder="0" style="padding: 0px; width: 100%;"></iframe>
    </el-row>
  </div>
</template>
<script>
  export default {
    props: {
      isShowBack: {
        type: Boolean,
        default: true
      },
    },
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
      window.miningId = this.$route.params.id;
      window.basePath =process.env.BASE_API
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scope>


</style>
