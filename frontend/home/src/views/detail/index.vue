<template>
	<transition
    name="rotate"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave">
    <div class="placeholder">
      <i class="close" @click="hideDetail">X</i>
      <div class="loading" v-if="loadingContent">
        <img src="https://tympanus.net/Development/3DGridEffect/img/preloader.gif" class="loading-icon">
      </div>
      <transition name="fade">
        <div class="posts-content" v-if="!loadingContent">
          <div class="posts-inner" v-html="detail" ref="detail"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.0/velocity.min.js"></script>
<script>
import { post } from 'common/js/api';
import '../../common/scss/markdown.scss';
import Velocity from 'velocity-animate';

export default {
  data () {
    return {
      loadingContent: true,
      detail: '',
      pos: {
        top: window.innerHeight / 2 - 130,
        left: window.innerWidth / 2 - 150
      }
    };
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      const id = to.query.id;
      const pos = to.params.pos;

      vm.getData(id);
    })
  },

  methods: {
    hideDetail() {
      this.detail = '';
      this.loadingContent = true;

      setTimeout(_=>{
        this.$router.go(-1);
      }, 300);
    },

    getData(id) {
      post('posts/detail/marked', { id: id }).then(r=>{
        this.detail = r.data.content;

        setTimeout(()=>{
          this.loadingContent = false;
        }, 1000);
      });
    },

    beforeEnter: function (el) {
      const pos = this.$route.params.pos || this.pos;

      el.style.top = pos.top + 'px';
      el.style.left = pos.left + 'px';
      el.style.width = 300 + 'px';
      el.style.height = 260 + 'px';
    },


    enter(el, done) {
      Velocity(el, { 
        top: 0, left: 0, 
        width: window.innerWidth,
        height: window.innerHeight, 
        rotateX: [ 0,'-179.9deg'],
        translateZ: 0,
        transition: 'none'
      }, { duration: 500 });
      
      done();
    },

    leave: function (el, done) {
      const pos = this.$route.params.pos || this.pos;

      Velocity(el, {
        top: pos.top, 
        left: pos.left, 
        width: 300,
        height: 260, 
        rotateX: [ '-179.9deg', 0],
      }, { duration: 500, complete: done })
    }
  },
};
</script>

<style lang="scss" scoped>

.placeholder{
  position: fixed;
  background-color: #fff;
  z-index: 1000;
  opacity: 1;
  box-sizing: border-box;
  margin-top: -1px;
  overflow: hidden;
  // transform: rotateX(-179.9deg);
  // transition: transform 0.5s;
}

.close{
  position: fixed;
  font-size: 32px;
  top:50px;
  right: 50px;
  cursor: pointer;
  z-index: 1000;
}

.posts-content{
  height: 100%;
  margin: 0 auto;
  width: 900px;
  max-width: 100%;
  overflow: hidden;
  background-color: #fff;
}

.posts-inner{
  height: 100%;
  width: 940px;
  max-width: 120%;
  padding: 0 30px;
  overflow-y: auto;
}
</style>