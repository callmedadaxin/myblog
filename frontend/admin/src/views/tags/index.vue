<template>
  <div class="main-content">
    <el-card class="content-card">
      <div slot="header" class="clearfix">
        <span class="card-title">标签管理</span>
      </div>  
      <el-tag
        :key="tag"
        v-for="tag in tagList"
        :closable="true"
        :close-transition="false"
        @close="handleClose(tag)"
      >
      {{tag.tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </el-card>
  </div>
</template>

<script>
import { get, post } from 'common/js/api';

export default {
  data () {
    return {
      tagList: [],
      meta: {
        page: 1,
        limit: 25
      }
    };
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getTagList();
    })
  },

  methods: {
    getTagList() {
      get('tag').then(r=>{
        this.tagList = r.data;
      }).catch(r=>{
        this.$toast(r.message);
      })
    },
    handleClose(tag) {
      post('tag/delete', { id: tag._id }).then(r=>{
        this.$toast('删除成功！');
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      }).catch(r=>{
        this.$toast(r.message);
      })
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
};
</script>

<style lang="css" scoped>
</style>