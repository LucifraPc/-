<template>
  <scroll-bar>
    <el-menu mode="vertical" :unique-opene='true'  :default-active="$route.path" 
      :collapse="isCollapse" text-color="#fff"
     >
      <sidebar-item :routes="routes" :curToAllocateNum='curToAllocateNum'></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>
<style>
  
</style>
<script>
  import {
    mapGetters
  } from 'vuex'
  import SidebarItem from './SidebarItem'
  import ScrollBar from '@/components/ScrollBar'

  export default {
    components: {
      SidebarItem,
      ScrollBar
    },
    computed: {
      ...mapGetters([
        'sidebar','curToAllocateNum'
      ]),
      routes() {
        return this.$router.options.routes
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }

</script>


<style>
.el-menu{
  background:none;
}
</style>

