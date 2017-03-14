<template>
	<transition name="rotate-in">
    <div class="placeholder" 
      :style="{ width: winStyle.width, height: winStyle.height }">
      <i class="close" @click="hideDetail">X</i>
      <div class="loading" v-show="loadingContent">
        <img src="https://tympanus.net/Development/3DGridEffect/img/preloader.gif" class="loading-icon">
      </div>
      <transition name="fade">
        <div class="posts-content" v-show="!loadingContent">
          <div class="posts-inner" v-html="detail" ref="detail"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { post } from 'common/js/api';
import '../../common/scss/markdown.scss';

export default {
  data () {
    return {
      loadingContent: true,
      winStyle: {
        width: window.innerWidth + 'px',
        height: window.innerHeight + 'px',
      },
      detail: ''
    };
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      const id = to.query.id;

      vm.getData(id);
    })
  },

  methods: {
    hideDetail() {
      this.$router.push({ path: '/home' });
    },

    getData(id) {
      post('posts/detail', { id: id }).then(r=>{
        this.detail = r.data.content;

        setTimeout(()=>{
          this.loadingContent = false;
          this.initDictionary();
        }, 1000);
      });
    },

    initDictionary() {
      const container = this.$refs.detail,
        hList = container.getElementsByTagName('h2');

      console.log(hList);
    } 
  },
};
</script>

<style lang="scss" scoped>

.placeholder{
  position: fixed;
  top: 50%;
  left: 50%;
  transition: all 0.5s;
  background-color: #eee;
  z-index: 1000;
  transform: translate3d(-50%,-50%,0) ;
  opacity: 1;
  box-sizing: border-box;
  margin-top: -1px;
}

.close{
  position: fixed;
  font-size: 32px;
  top:50px;
  right: 50px;
}

.rotate-in-enter, .rotate-in-leave-active {
  opacity: 0;
  width: 340px!important;
  height: 300px!important;
  transform: translate3d(-50%,-50%,-1500px) rotateX(179.9deg);
  margin-left: -15px;
}

.posts-content{
  height: 100%;
  margin: 0 auto;
  max-width: 900px;
  overflow: hidden;
}

.posts-inner{
  height: 100%;
  width: 940px;
  padding: 0 30px;
  overflow-y: auto;
}
</style>