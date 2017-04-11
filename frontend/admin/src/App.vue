<template>
  <div id="app">
    <topbar></topbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Topbar from 'header';
import store from './store/store.js'
import './common/scss/index.scss'

export default {
  store: store,
  components: {
    Topbar
  }
}
</script>

<style lang="scss">
html {
  height: 100%;
  transition: height 0.5s;
}
</style>
