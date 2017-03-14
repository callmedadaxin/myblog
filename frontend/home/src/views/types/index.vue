<template>
  <div id="types">
    <ul class="type-list">
      <li v-for="item in types" :style="{fontSize: getSize(item)}">{{item.type}}({{item.num}})</li >
    </ul>
  </div>
</template>

<script>
import {get} from 'common/js/api';
export default {
  data () {
    return {
      types: []
    };
  },

  mounted() {
    get('type').then(r=>{
      this.types = r.data.map(function(elem) {
        elem.value = Math.random() * 100;

        return elem;
      })
    })
  },

  methods: {
    getSize(item) {
      return item.value + 'px';
    }
  }
};
</script>

<style lang="css" scoped>
</style>