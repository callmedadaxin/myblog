<template>
  <div id="main-content">
    <top-bar></top-bar>
    <router-view id="content"></router-view>
  </div>
</template>

<script>
import store from './store/store.js'
import TopBar from 'header';

export default {
  store: store,
  components: {
    TopBar
  }
}
</script>

<style lang="scss">
#main-content{
  display: flex;
  flex-direction: column;
}
#content{
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
}
</style>

