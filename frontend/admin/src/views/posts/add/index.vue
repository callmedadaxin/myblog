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
        <!-- <el-button style="float: right;" type="primary">完成</el-button> -->
      </div> 
      <el-form ref="form" :model="descData" class="input-form" label-width="100px">
        <el-form-item label="文章标题">
          <el-input v-model="descData.title"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要">
          <el-input v-model="descData.abstract" type="textarea" placeholder="请输入文章摘要"></el-input>
        </el-form-item>
        <el-form-item label="文章配图">
          <el-upload
            class="upload-input"
            drag
            list-type="picture-card"
            :action="action"
            :on-success="onUploadSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            v-model="descData.tag"
            multiple
            filterable
            placeholder="请选择文章标签">
            <el-option
              v-for="item in tagList"
              :label="item.tag"
              :value="item._id">
            </el-option>
          </el-select>
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
        </el-form-item>
        <el-form-item label="分类">
          <el-select
            v-model="descData.type"
            filterable
            placeholder="请选择文章分类">
            <el-option
              v-for="item in typeList"
              :label="item.type"
              :value="item._id">
            </el-option>
          </el-select>
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
          <el-button v-show="!inputTypeVisible" class="button-new-tag" size="small" @click="showInput('type')">+ New Type</el-button>
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
      typeList: [],
      inputVisible: false,
      inputTypeVisible: false,
      inputValue: '',
      action: ENV_OPT.baseApi + 'files/file-upload'
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
    onSubmit() {
      var data = Object.assign(this.descData, { content: this.source });

      post('posts/add', data, true).then(r=> {
        this.$router.push({path: '/posts'});
      }).catch(r=>{
        this.$toast(r.message);
      })
    },

    onUploadSuccess(response, file, fileList) {
      this.descData.show = response.data.url;
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