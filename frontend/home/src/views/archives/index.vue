<template>
  <div class="archives">
    <ul class="type-content">
      <li v-for="(posts, time) in groupList" >
        <h3 class="type-title">{{ time || '' }}</h3>
        <ul class="post-list">
          <li v-for="post in posts">
            <h4 @click="showDetail(post._id)" class="posts-title">{{post.title}}</h4>
            <p>{{post.abstract}}</p>
          </li >
        </ul>
      </li >
    </ul>
  </div>
</template>

<script>
import { post } from 'common/js/api'

export default {
  data () {
    return {
      postsList: [],
    };
  },

  computed: {
    groupList() {
      var list = this.postsList,
        result = {};

      list.forEach(posts => {
        var time = new Date(parseInt(posts.ctime) || null);

        var year = time.getFullYear();
        var month = time.getMonth();

        var tag = `${year}-${month}`;

        if(result[tag]) {
          result[tag].push(posts)
        } else {
          result[tag] = [posts]
        }
      })

      return result;
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getData();
    })
  },

  // beforeRouteLeave(to, from, next) {
  //   const path = to.path;

  //   if(path.indexOf('inner') >= 0) {
  //     next(false);
  //   } else {
  //     next();
  //   }
  // },  

  methods: {
    getData() {
      post('posts').then(r=>{
        this.postsList = r.data.list;
      }).catch(e=>{
        this.$toast('服务器出错，请刷新重试！');
      })
    },

    showDetail(id) {
      this.$router.push({ name: 'detail', query: { id: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.archives{
  justify-content: flex-start!important;
}
.type-content{
  width: 100%;
  flex: 1;
  padding: 60px;
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

      &:hover{
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}


</style>