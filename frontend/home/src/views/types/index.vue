<template>
  <div class="types">
    <div class="types-content">
      <ul class="type-list">
        <li v-for="item in contentList" class="tags">
          <a :href="'#inner' + item._id">
            {{item.type}}({{item.items.length || 0}})
          </a>
        </li >
      </ul>
      <ul class="type-content">
        <li v-for="type in contentList" >
          <a :name="'inner' + type._id"></a>
          <h3 class="type-title">{{ type.type || '' }}</h3>
          <ul class="post-list">
            <li v-for="item in type.items">
              <h4 class="posts-title">{{item.title}}</h4>
              <p>{{item.abstract}}</p>
            </li >
          </ul>
        </li >
      </ul>
    </div>
  </div>
</template>

<script>
import { get, post } from 'common/js/api';

export default {
  data () {
    return {
      types: [],
      contentList: [],
    };
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getData();
    })
  },

  beforeRouteLeave(to, from, next) {
    const path = to.path;

    if(path.indexOf('inner') >= 0) {
      next(false);
    } else {
      next();
    }
  },  

  methods: {
    getSize(item) {
      return item.value + 'px';
    },

    getData() {
      post('posts/group').then(r=>{
        this.contentList = r.data;
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.types{
  justify-content: flex-start!important;
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

  a{
    color: #fff;
  }
}

.type-list{
  margin: 0 auto;
  max-width: 968px;
}

.type-content{
  margin: 0 auto;  
  margin-top: 40px;
  max-width: 968px;

  >li{
    margin: 20px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #fff;
  }
}

.type-title{
  font-size: 24px;
  color: #fff;

  &:before{
    content: "❤";
    margin-right: 5px;
  }
}

.post-list{
  padding: 0 10px;

  li{
    margin: 10px 0;
    padding-bottom: 10px;
    // border-bottom: 1px solid rgba(255,255,255,0.5);
    zoom: 1;
    &:before,
    &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
      visibility: hidden;
      font-size: 0;
      height: 0;
    }

    >*{
      width: 52%;
      float:right;
      line-height: 1.2;
    }

    .posts-title{
      font-size: 18px;
      font-weight: bold;
      line-height: 1.5;
    }
  }
}


</style>