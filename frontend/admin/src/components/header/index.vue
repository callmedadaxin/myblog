<template>
  <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal">
    <router-link to="/posts">
      <el-menu-item index="1">文章管理</el-menu-item>
    </router-link>
    <router-link to="/tags">
      <el-menu-item index="2">标签管理</el-menu-item>
    </router-link>
    
    <!-- <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-submenu>
    <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
  </el-menu>
</template>

<script>
export default {
  data () {
    return {

    };
  }
};
</script>

<style lang="css" scoped>
</style>