<template>
  <div class="main-content">
    <el-card class="content-card content-edit" v-show="!editDesc">
      <div slot="header" class="clearfix">
        <span class="card-title">{{title}}</span>
        <el-button style="float: right;" type="primary" @click="goNext">下一步</el-button>
      </div> 
      <div class="edit-wrap">
        <div class="uploads">
          <el-upload
            class="upload-demo"
            action="http://up-z2.qiniu.com/"
            :on-success="onUploadSuccess"
            :data="upLoadData"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <div class="contents">
          <div class="left">
            <textarea v-model="descData.content" cols="30" rows="10" @scroll="onScroll"></textarea>
          </div>
          <div class="right posts-inner" ref="preview">
            <vue-markdown :source="descData.content" :show="true" ></vue-markdown>
          </div>
        </div>
      </div>  
    </el-card>
    <info-edit :data="upLoadData" :edit="isEdit" v-show="editDesc" :desc-data="descData" :tag-list="tagList" :type-list="typeList"></info-edit>
  </div>
</template>

<script>
import 'common/scss/markdown';

import VueMarkdown from 'vue-markdown';
import { get, post } from 'common/js/api';
import InfoEdit from './info-edit.vue';

export default {
  data () {
    return {
      source: '',
      editDesc: false, //是否编辑信息
      fileList: [],
      upLoadData: {
        token: '',
      },
      tagList: [],
      typeList: [],
      domain: 'http://oowxefv5q.bkt.clouddn.com/',
      descData: {
        content: '',
        title: '',
        abstract: '',
        show: '',
        tag: [],
        type: ''
      },
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
      vm.getToken();
      vm.getPostsData();
    })
  },

  methods: {
    getToken() {
      get('files/uptoken').then(r => {
        this.upLoadData.token = r.data.uptoken;
      }) 
    },

    onUploadSuccess(response, file, fileList) {
      this.source += `![](${this.domain}${response.key})`;
    },

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

    getPostsData() {
      post('posts/detail', { id: this.$route.params.id }).then(r => {
        this.descData = r.data;
      })
    }
  },

  components: {
    VueMarkdown,
    InfoEdit
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
.input-new-tag{
  max-width: 100px;
}

.content-card{
  width: 1400px;
  height: 100%;
}

.input-form{
  max-width: 600px;
}

.edit-wrap{
  display: flex;
  height: 100%;
  flex-direction: column;

  .uploads{
    flex: 0 0 80px;
  }

  .contents{
    display: flex;
    flex: 1;
  }

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