<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <!-- <svg-icon  icon-class="logo" style="width:335px;height:118px"></svg-icon> -->
      <h3 class="title" >电销客户管理系统</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autofocus="autofocus"  autoComplete="on" placeholder="username" />
        <!-- <i class="el-icon-circle-close icon-size" v-show="loginForm.username.length>0" @click="loginForm.username=''"></i> -->
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="password"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-checkbox class="automaticLogin" v-model="automaticLogin">自动登录</el-checkbox>
     
      <el-form-item>
        <el-button type="primary" style=" 
       background-image: -moz-linear-gradient(top, #6eb6de, #4a77d4); 
       background-image: -ms-linear-gradient(top, #6eb6de, #4a77d4); 
       background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#6eb6de), to(#4a77d4)); 
       background-image: -webkit-linear-gradient(top, #6eb6de, #4a77d4); 
       background-image: -o-linear-gradient(top, #6eb6de, #4a77d4); 
       background-image: linear-gradient(top, #6eb6de, #4a77d4); 
       background-repeat: repeat-x; filter: progid:dximagetransform.microsoft.gradient(startColorstr=#6eb6de, endColorstr=#4a77d4, GradientType=0);  border: 1px solid #3762bc; text-shadow: 1px 1px 1px rgba(0,0,0,0.4); 
       box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.5);
       width:100%;
       height:45px" 
       :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
  import {
    isvalidUsername
  } from '@/utils/validate'
  import {login} from '@/api/login.js'

  import md5 from 'js-md5';

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value=='' || value.trim()=='') {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        automaticLogin:false,
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePass
          }]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    created() {
        this.$cookies.get("automaticLogin")?this.automaticLogin=true:this.automaticLogin=false;
        this.$cookies.get("usernameCrm")?this.loginForm.username=this.$cookies.get("usernameCrm"):this.loginForm.username='';
        this.$cookies.get("passwordCrm")?this.loginForm.password=this.$cookies.get("passwordCrm"):this.loginForm.password='';

        if(this.$cookies.get("formwhere") && this.$cookies.get("automaticLogin") && this.$cookies.get("usernameCrm") && this.$cookies.get("passwordCrm")){
            let baseUrlForm = window.location.origin;
            if(this.$cookies.get("formwhere")=='formLogin' && baseUrlForm==this.$cookies.get("formwhereUrl")){
                let vm =this;
                setTimeout(function(){
                    vm.handleLogin()
                })
            }
        }else{
            this.$cookies.set("passwordCrm",'');
        }
        

        //阻止用户频繁点击登录
          this.handleLogin = this.debounce(this.handleLogin, 500)
          document.onkeydown = (event) => {
              if (event.keyCode == 13) {
                  this.handleLogin()
              }
          }
    },
    watch: {
    // 检测搜索全部操作
      // 'loginForm.username'(){
      //   this.loginForm.password="";
      // }
    },
    methods: {
      //阻止用户频繁按登录
      debounce(fn, time) {
          let startTime = 0;
          return function (...args) {
              let curTime = new Date();
              if (curTime - startTime >= time) {
                  fn.apply(this, args);
                  startTime = curTime;
              }
          }
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            let loginForm = {};
            loginForm.username = this.loginForm.username;
            loginForm.password = md5(this.loginForm.password);
            login(loginForm).then((res)=>{

              this.loading = false;
              if(res.msg=='success'){
                // 当前登录的角色 MEMBER:电销人员 ，MANAGER:电销经理 ,
                // 使用客服登录的时候客户管理列表的销售人员字段不用展示筛选列表
                  this.$cookies.set("roleCrm", res.data.role);
                  this.$cookies.set("usernameCrm", loginForm.username);
                  if(this.automaticLogin){
                      this.$cookies.set("passwordCrm", this.loginForm.password);
                      this.$cookies.set("automaticLogin", this.automaticLogin);
                      this.$cookies.set("formwhere", "formLogin");
                      this.$cookies.set("formwhereUrl", window.location.origin);
                  }else{
                      this.$cookies.set("automaticLogin","");
                  }
                  this.$message({
                    message:'登录成功',
                    type: 'success'
                  })
                  this.$router.push({
                      path: '/customer-management'
                  })
              }else{
                  this.$message({
                      message: res.msg,
                      type: 'error'
                  })
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            // console.log('error submit!!')
            return false
          }
        })
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: $bg;
    background: -moz-radial-gradient(0% 100%, ellipse cover, rgba(104, 128, 138, .4) 10%, rgba(138, 114, 76, 0) 40%), -moz-linear-gradient(top, rgba(57, 173, 219, .25) 0%, rgba(42, 60, 87, .4) 100%), -moz-linear-gradient(-45deg, #670d10 0%, #092756 100%);
    background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104, 128, 138, .4) 10%, rgba(138, 114, 76, 0) 40%), -webkit-linear-gradient(top, rgba(57, 173, 219, .25) 0%, rgba(42, 60, 87, .4) 100%), -webkit-linear-gradient(-45deg, #670d10 0%, #092756 100%);
    background: -o-radial-gradient(0% 100%, ellipse cover, rgba(104, 128, 138, .4) 10%, rgba(138, 114, 76, 0) 40%), -o-linear-gradient(top, rgba(57, 173, 219, .25) 0%, rgba(42, 60, 87, .4) 100%), -o-linear-gradient(-45deg, #670d10 0%, #092756 100%);
    background: -ms-radial-gradient(0% 100%, ellipse cover, rgba(104, 128, 138, .4) 10%, rgba(138, 114, 76, 0) 40%), -ms-linear-gradient(top, rgba(57, 173, 219, .25) 0%, rgba(42, 60, 87, .4) 100%), -ms-linear-gradient(-45deg, #670d10 0%, #092756 100%);
    background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104, 128, 138, .4) 10%, rgba(138, 114, 76, 0) 40%), linear-gradient(to bottom, rgba(57, 173, 219, .25) 0%, rgba(42, 60, 87, .4) 100%), linear-gradient(135deg, #670d10 0%, #092756 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3E1D6D', endColorstr='#092756', GradientType=1);
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      /*padding: 12px 5px 12px 15px;*/
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 460px;
      padding: 35px 35px 15px 35px;
      margin: 240px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .icon-size{
      font-size:16px;
      color: #889AA4;
      cursor:pointer;
      position: relative;
      right:5px;
      top:2px;
    }
    .automaticLogin{
        margin:0px 0px 20px 2px;
        .el-checkbox__label{
          color:#fff;
        }
        .el-checkbox__input.is-checked+.el-checkbox__label{
          color:#409EFF;
        }
    }
  }

</style>
