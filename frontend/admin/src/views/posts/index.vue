<template>
	<div class="main-content">
		<el-card class="content-card">
      <div slot="header" class="clearfix">
        <span class="card-title">文章列表</span>
        <el-button style="float: right;" type="primary">发布文章</el-button>
      </div>  
      <el-table
        :data="postsList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="ctime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button type="text">内容编辑</el-button>
            <el-button type="text">信息编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
	</div>
</template>

<script>
import { post } from 'common/js/api';

export default {
  data () {
    return {
      postsList: [],
      meta: {
        page: 1,
        limit: 25
      }
    };
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getPostsList();
    })
  },

  methods: {
    getPostsList() {
      post('posts', this.meta).then(r=>{
        this.postsList = r.data.list;
        this.meta = r.data.meta;
      }).catch(r=>{
        this.$toast(r.message);
      })
    }
  }
};
</script>

<style lang="css" scoped>
</style>