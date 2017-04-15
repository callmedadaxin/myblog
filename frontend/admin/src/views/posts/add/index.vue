<template>
  <div class="main-content">
    <el-card class="content-card content-edit" v-if="!editDesc">
      <div slot="header" class="clearfix">
        <span class="card-title">{{title}}</span>
        <el-button style="float: right;" type="primary" @click="goNext">下一步</el-button>
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
    <el-card class="content-card content-edit" v-else>
      <div slot="header" class="clearfix">
        <span class="card-title">{{title}}</span>
        <el-button style="float: right;" type="primary">完成</el-button>
      </div> 
      <el-form ref="form" :model="descData" label-width="100px">
        <el-form-item label="文章标题">
          <el-input v-model="descData.title"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要">
          <el-input v-model="descData.abstract" type="textarea" placeholder="请输入文章摘要"></el-input>
        </el-form-item>
        <el-form-item label="文章配图">
          
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            v-model="descData.tag"
            multiple
            filterable
            allow-create
            placeholder="请选择文章标签">
            <el-option
              v-for="item in tagList"
              :label="item.tag"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'common/scss/markdown';

import VueMarkdown from 'vue-markdown';
import { get, post } from 'common/js/api';

export default {
  data () {
    return {
      source: 'sdfsdf ',
      editDesc: false, //是否编辑信息
      descData: {
        title: '',
        abstract: '',
        show: '',
        tag: [],
        type: ''
      },
      tagList: [],
      typeList: []
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

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getTagList();
      vm.getTypeList();
    })
  },

  methods: {
    onScroll(e) {
      this.$refs.preview.scrollTop = e.target.scrollTop;
    },

    goNext() {
      this.editDesc = true;
    },

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