<template>
  <div class="app-container">
    <el-row class="el-row-wrap" v-show='isShowBack'>
      <span style="display:inline-block;font-size: 18px;font-weight: bold;line-height: 38px;">任务名称：{{curUserInfo.name}} 时间：{{curUserInfo.addTime}}</span>
      <el-button size="small" round @click="backToPrevious" style="float:right;margin-top:5px">返回</el-button>
    </el-row>
    <el-row class="el-row-wrap">
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
        src: `${process.env.BASE_API}static/dataMining/showCondition.html`
        // src: `/static/dataMining/showCondition.html`
      }
    },
    methods: {
      backToPrevious() {
        this.$router.push({
          path: `/resource-allocation/data-mining`
        });
      },
      setIframeHeight(id) {
        try {
          var iframe = document.getElementById(id);
          var _iframe = iframe.contentWindow;
          if (iframe.attachEvent) {
            iframe.attachEvent("onload", function () {
              var _div =_iframe.document.getElementById('cenditionListWrap');
              iframe.height = _div.currentStyle["height"];
            });
            return;
          } else {
            iframe.onload = function () {
              var _div =_iframe.document.getElementById('cenditionListWrap');
              setTimeout(() => {
                iframe.height=getComputedStyle(_div,false)['height'];
                console.log(getComputedStyle(_div,false)['height']);
              }, 50);              
            };
            return;
          }
        } catch (e) {
          throw new Error('setIframeHeight Error');
          iframe.height='750px'
        }
      }
    },
    created() {
      this.curUserInfo = JSON.parse(sessionStorage.getItem('curUserInfo'))
    },
    mounted() {
      window.mainFrame.miningId = this.$route.params.id;
      window.miningId = this.$route.params.id;
      window.basePath = process.env.BASE_API
      this.setIframeHeight('mainFrame')  
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scope>
  .el-row+.el-row {
    margin-top: 15px;
  }

</style>
