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
        <router-link class="inlineBlock" to="/" style="text-align:center;">
          <el-dropdown-item >
            <span style="width:80px;">首 页</span>
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;width:80px;text-align:center;">退 出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import {logout} from '@/api/login.js'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
        this.userName=this.$cookies.get("usernameCrm");
    },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      logout().then((res)=>{
          this.$cookies.set("formwhere", "formLoginOut");
          this.$router.push({
              path: '/login'
          })
          // location.reload();
      })
    }
  }
}
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
        margin-left:5px;
      }
    }
  }
}
</style>

