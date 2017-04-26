<template>
  <div class="types">
    <div class="types-content">
      <ul class="type-list">
        <li v-for="item in types" class="tags">
        {{item.type}}({{item.num}})
        </li >
      </ul>
      <ul class="type-content">
        
      </ul>
    </div>
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
      this.types = r.data;
    })
  },

  methods: {
    getSize(item) {
      return item.value + 'px';
    },
  }
};
</script>

<style lang="scss" scoped>
.types{
  padding-top: 80px;

}
.types-content{
  width: 100%;
  flex: 1;
  padding: 80px;
  color: #fff;
}

.tags{
  display: inline-block;
  margin: 5px;
  padding: 0 15px;
  border: 1px solid #fff;
  font-size: 18px;
  line-height: 30px;
  border-radius: 30px;
  cursor: pointer;
}

.type-list{
  margin: 0 auto;
  max-width: 968px;
}
</style>