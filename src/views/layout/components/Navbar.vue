<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <!-- <breadcrumb></breadcrumb> -->
    <el-dropdown class="avatar-container">
      <div class="avatar-wrapper">
        <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
        <span>{{userName}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <!-- <router-link class="inlineBlock" to="/" style="text-align:center;"> -->
        <el-dropdown-item>
          <span style="display:block;width:80px;text-align:center;" @click="changePasswordDialogVisible=true">修改密码</span>
        </el-dropdown-item>
        <!-- </router-link> -->
        <el-dropdown-item divided>
          <span @click="logout " style="display:block;width:80px;text-align:center;">退 出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="修改密码" :visible.sync="changePasswordDialogVisible" size='tiny' class="widthDialog500" custom-class="repeat-pass" :close-on-click-modal="false">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"  label-position="left">
        <el-form-item label="当前密码：" prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off" :minlength="6"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword" auto-complete="off" :minlength="6"></el-input>
        </el-form-item>
        <el-form-item label="再次输入：" prop="repeat">
          <el-input type="password" v-model="ruleForm.repeat" auto-complete="off" :minlength="6"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')" class="dialog-btn">确 定</el-button>
        <el-button @click="changePasswordDialogVisible = false;ruleForm.resetFields()" class="dialog-btn">取消</el-button>
      </span>
    </el-dialog>
  </el-menu>

</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import {
    logout,
    changePass
  } from "@/api/login.js";
  import md5 from 'js-md5';
  // import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from "@/components/Hamburger";

  export default {
    data() {
      //验证两次密码是否一致
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (this.ruleForm.newPassword != this.ruleForm.repeat) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePassNew = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'));
        } else if (value.length < 6 && value) {
          callback(new Error('密码不能小于6位'));
        }
        callback();
      };
      return {
        changePasswordDialogVisible: false,
        ruleForm: {
          password: "",
          newPassword: "",
          repeat: ""
        },
        rules: { //密码表单规则验证
          password: [{
            required: true,
            validator: validatePassNew,
            // message: "请输入密码",
            trigger: "blur"
          }],
          newPassword: [{
            required: true,
            validator: validatePassNew,
            // message: "请输入密码",
            trigger: "blur"
          }],
          repeat: [{
            required: true,
            validator: validatePass2,
            trigger: 'blur'
          }]
        },
      };
    },
    components: {
      // Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters(["sidebar", "avatar"])
    },
    created() {
      this.userName = this.$cookies.get("usernameCrm");
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("ToggleSideBar");
      },
      logout() {
        logout().then(res => {
          this.$cookies.set("formwhere", "formLoginOut");
          this.$router.push({
            path: "/login"
          });
          // location.reload();
        });
      },
      //修改密码提交
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            changePass({
              "newPassword": md5(this.ruleForm.newPassword),
              "oldPassword": md5(this.ruleForm.password)
            }).then(res => {
              if (res.code == 0||res.code == 102) {
                this.$message.error(res.msg);
              } else {
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.changePasswordDialogVisible=false
              }

            })

          } else {
            //                        console.log("error submit!!");
            return false;
          }
        });
      },
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 65px;
    line-height: 65px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 75px;
      height: 65px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 55px;
      .avatar-wrapper {
        cursor: pointer;
        /*margin-top: 13px;*/
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .el-icon-caret-bottom {
          /* position: absolute;
        right:00px;
        top: 25px;*/
          font-size: 12px;
          margin-left: 5px;
        }
      }
    }
  }

</style>
