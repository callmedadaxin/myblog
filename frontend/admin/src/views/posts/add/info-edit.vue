<template>
  <el-card class="content-card content-edit">
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
          :data="data"
          list-type="picture-card"
          action="http://up-z2.qiniu.com/"
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
</template>

<script>
import { post } from 'common/js/api';

export default {

  name: 'info-edit',

  props: ['typeList', 'tagList', 'data', 'descData', 'edit', 'domain'],

  data () {
    return {
      inputVisible: false,
      inputTypeVisible: false,
      inputValue: '',
    };
  },

  methods: {
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
    },

    onSubmit() {
      var target = this.edit ? 'update' : 'add';

      var data = Object.assign(this.descData);

      post('posts/' + target, data, true).then(r=> {
        this.$router.push({path: '/posts'});
      }).catch(r=>{
        this.$toast(r.message);
      })
    },

    onUploadSuccess(response, file, fileList) {
      this.descData.show = `${this.domain}${response.key}`;
    },
  }
};
</script>

<style lang="css" scoped>
</style>