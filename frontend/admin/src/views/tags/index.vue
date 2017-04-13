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
        @close="handleClose(tag, 'tag')"
        class="tags"
      >
      {{tag.tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-show="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-show="!inputVisible" class="button-new-tag" size="small" @click="showInput('tag')">+ New Tag</el-button>
    </el-card>
    <el-card class="content-card">
      <div slot="header" class="clearfix">
        <span class="card-title">分类管理</span>
      </div>  
      <el-tag
        :key="type"
        v-for="type in typeList"
        :closable="true"
        :close-transition="false"
        @close="handleClose(type, 'type')"
        class="tags"
      >
      {{type.type}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-show="inputTypeVisible"
        v-model="inputValue"
        ref="saveTypeInput"
        size="mini"
        @keyup.enter.native="handleTypeInputConfirm"
        @blur="handleTypeInputConfirm"
      >
      </el-input>
      <el-button v-show="!inputTypeVisible" class="button-new-tag" size="small" @click="showInput('type')">+ New Tag</el-button>
    </el-card>
  </div>
</template>

<script>
import { get, post } from 'common/js/api';

export default {
  data () {
    return {
      tagList: [],
      typeList: [],
      inputValue: '',
      inputVisible: false,
      inputTypeVisible: false
    };
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getTagList();
      vm.getTypeList();
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

    getTypeList() {
      get('type').then(r=>{
        this.typeList = r.data;
      }).catch(r=>{
        this.$toast(r.message);
      })
    },

    handleClose(tag, type) {
      const list = type === 'tag' ? this.tagList : this.typeList;

      post( type + '/delete', { id: tag._id }).then(r=>{
        this.$toast('删除成功！');
        list.splice(list.indexOf(tag), 1);
      }).catch(r=>{
        this.$toast(r.message);
      })
    },

    showInput(type) {
      if(type === 'tag') {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      } else {
        this.inputTypeVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTypeInput.$refs.input.focus();
        });
      }
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;

      this.inputVisible = false;
      this.inputTypeVisible = false;
      this.inputValue = '';

      if (!inputValue) {
        return true;
      }
      
      post('tag/add', { tag: inputValue }, true).then(r=>{
        this.$toast('添加成功！');
        this.tagList.push(r.data);
      }).catch(r=>{
        this.$toast(r.message);
      })
    },

    handleTypeInputConfirm() {
      let inputValue = this.inputValue;

      this.inputVisible = false;
      this.inputTypeVisible = false;
      this.inputValue = '';

      if (!inputValue) {
        return true;
      }
      
      post('type/add', { type: inputValue }, true).then(r=>{
        this.$toast('添加成功！');
        this.typeList.push(r.data);
      }).catch(r=>{
        this.$toast(r.message);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.tags{
  margin: 0 5px;
}

.input-new-tag{
  max-width: 100px;
}

.content-card{
  margin-bottom: 40px;
}
</style>