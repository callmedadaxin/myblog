<template>
  <transition name="zoom">
    <div class="list-wrap" :class="{ active: showing }">
      <ul class="v-list" ref="list">
        <li v-for="(item, index) in items">
          <div class="item-wrap" @click.prevent.stop="showDetail(item._id, index)">
            <img src="https://p.ssl.qhimg.com/t01c79775dce5c2651e.jpg" alt="">
            <!-- <img :src="item.show" alt=""> -->
            <div class="item-bottom">
              <!-- <i :style="{ backgroundImage: `url(${item.show})` }" class="blur"></i> -->
              <i :style="{ backgroundImage: `url(${item.show})` }" class="blur"></i>
              <h3 class="item-title">{{item.title}}</h3>
              <p class="item-desc">{{item.abstract}}</p>
            </div>
          </div>
        </li >
      </ul>
      <div id="pagination">
        <ul>
          <li :class="{active: item == meta.page}"v-for="item in pages" @click="jumpTo(item)">{{item}}</li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { post } from 'common/js/api';
import { getOffset } from 'common/js/base';

export default {
  data () {
    return {
      items: [],
      showing: false,
      meta: {
        pages: 0,
        page: 1
      },
      detail: ''
    };
  },

  computed: {
    pages: function () {
      const meta = this.meta;
      let res = [],
          target = meta.page + 2;

      if(target < 6 && meta.pages > 5) {
        target = 5;
      }

      for(var i= meta.page - 2; i<= target; i++){
        if(i < 1) {
          i = 1;
        }

        if(i > meta.pages) {
          return res;
        }
        res.push(i);
      }

      return res;
    },


  },

  methods: {
    showDetail(id, index) {
      const position = this.getPosition(index);

      this.showing = true;

      setTimeout(()=>{
        this.$router.push({ name: 'detail', query: { id: id }, params: { pos: position } });
      }, 200);
    },

    jumpTo(page) {
      post('posts', {
        page: page,
        limit: 9
      }).then(r=>{
        this.items = r.data.list;
        this.meta = r.data.meta;
      })
    },

    getPosition(index) {
      const wrap = this.$refs.list;
      const target = wrap.getElementsByTagName('li')[index];

      return getOffset(target);
    }
  },

  mounted() {
    post('posts', {
      page: 1,
      limit: 9
    }).then(r=>{
      this.items = r.data.list;
      this.meta = r.data.meta;
    })
  }
};
</script>

<style lang="scss">
@media screen and (max-width: 1400px) {
  html{
    overflow: hidden;
  }
  .list-wrap {
    margin-top: 50px;
    transform: scale(0.6);
    transform-origin: top center;
  }
}

.list-wrap{
  perspective: 1500px;
  height: 1020px;


  .v-list{
    transition: transform 0.5s;
    transform: translate3d(0,0, 0);
  }

  &.active{
    .v-list{
      transition: transform 0.5s;
      transform: translate3d(0,0, -1500px);
      transform-style: preserve-3d;
    }
  }
}

.zoom-enter {
  .v-list{
    transform: translate3d(0,0, -1500px);
    transform-style: preserve-3d;
  }
}

.v-list{
  display: flex;
  flex-wrap: wrap;
  align-item: center;
  margin: 0 auto;
  max-width: 1000px;

  li{
    display: block;
    flex: 0 0 33.33%;
    width: 33.33%;
    text-align: center;
    margin-bottom: 40px;
    overflow: hidden;
    
    img{
      transition: transform 0.5s;
    }
  }
}

.item-wrap{
  position: relative;
  display: inline-block;
  width: 300px;
  height: 260px;
  overflow: hidden;
  cursor: pointer;

  img{
    width: 100%;
    height: 100%;
  }

  &:hover{
    img{
      transform: scale(1.15);
    }

    .item-bottom{
      transform: translate3d(0,0,0);
    }
  }
}

.item-bottom{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  padding: 10px;
  background-color: rgba(0,0,0, 0.6);
  transform: translate3d(0,100%,0);
  transition: transform 0.5s;
  color: rgba(255,255,255, .85);
  text-align: left;
  box-sizing: border-box;
  background-color: rgba(0,0,0, 0.4);
  overflow: hidden;

  .blur{
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-position: 0 bottom;
    filter: brightness(0.5) blur(5px);
    z-index: -1;
  }
}

.item-title{
  font-size: 18px;
  margin-bottom: 2px;
  margin-top: 0;
}

.item-desc{
  margin: 0;
  height: 20px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255,255,255, 0.74);
  text-align: justify;
  text-overflow:ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.loading{
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;

  .loading-icon{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    margin-left: -25px;
    margin-top: -25px;
  }
}

.posts-content{
  margin: 0 auto;
  max-width: 900px;
  min-height: 100%;
  background-color: #ccc;
}

#pagination{
  flex: 0 0 80px;

  ul{
    display: flex;

    li{
      margin-right: 10px;
      width: 24px;
      line-height: 35px;
      text-align: center;
      color: #fff;

      &:hover{
        border-bottom: 1px solid #fff;
        cursor: pointer;
      }

      &.active{
        border-bottom: 1px solid #fff;
      }
    }
  }
}
</style>