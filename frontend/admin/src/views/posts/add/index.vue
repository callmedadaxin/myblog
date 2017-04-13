<template>
  <div class="main-content">
    <el-card class="content-card content-edit">
      <div slot="header" class="clearfix">
        <span class="card-title">{{title}}</span>
        <el-button style="float: right;" type="primary">发布文章</el-button>
      </div> 
      <div class="edit-wrap">
        <div class="left">
          <textarea v-model="source" cols="30" rows="10" @scroll="onScroll"></textarea>
        </div>
        <div class="right posts-inner" ref="preview">
          <vue-markdown :source="source" :show="true" ></vue-markdown>
        </div>
      </div> 
    </el-card>
  </div>
</template>

<script>
import 'common/scss/markdown';

import VueMarkdown from 'vue-markdown';

export default {
  data () {
    return {
      source: 'sdfsdf ',
    };
  },

  computed: {
    isEdit() {
      return this.$route.path.indexOf('edit') >= 0;
    },

    title() {
      return this.isEdit ? '编辑文章' : '添加文章';
    }
  },

  methods: {
    onScroll(e) {
      this.$refs.preview.scrollTop = e.target.scrollTop;
    }
  },

  components: {
    VueMarkdown
  }
};
</script>

<style lang="scss">
.content-edit{
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .el-card__header{
    flex: 0 0 60px;
  }
  .el-card__body{
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>
<style lang="scss" scoped>
.content-card{
  width: 1400px;
  height: 100%;
}

.edit-wrap{
  display: flex;
  height: 100%;

  .left,.right{
    flex: 0 0 50%;
    height: 100%;
    overflow: hidden;
  }

  .left{
    border-right: 1px solid #ccc;
    padding-right: 20px;

    textarea{
      width: 100%;
      height: 100%;
      font-size: 1.3em;
      padding: 20px;
    }
  }

  .right{
    padding-left: 40px;
    overflow: auto;
    padding-right: 20px;
  }
}
</style>