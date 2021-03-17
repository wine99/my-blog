<template>
  <div class="article-page" v-if="article">
    <link href="https://cdn.bootcdn.net/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css" rel="stylesheet">
    <div class="header">
      <h1 class="title">{{ article.title }}</h1>

      <div class="info">
        <div class="author">{{ article.authorName }}</div>
        <div class="time">发布于：{{ article.createdAt }}</div>
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit" command="goToEditPage">编辑</el-dropdown-item>
            <el-dropdown-item icon="el-icon-delete" command="deleteArticle">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>
    <div v-html="article.content" class="markdown-body"/>
  </div>
</template>

<style lang="scss" scoped>
.article-page {
  text-align: left;
}

.header {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 10px 45px;

  .info {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    font-size: 0.75rem;

    .author {
      font-weight: bold;
    }

    .time {
      margin: 0 20px;
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
      font-size: inherit;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>

<script>
import '../assets/hljs.default.css';

import { processArticleObject } from '../helpers/helpers';

export default {
  name: 'ArticlePage',
  data() {
    return {
      article: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getArticleDetail(vm.$route.params.id);
    });
  },
  beforeRouteUpdate(to, from, next) {
    next((vm) => {
      vm.getArticleDetail(vm.$route.params.id);
    });
  },

  methods: {
    getArticleDetail(id) {
      this.article = null;
      this.axios.get(`/api/article/${id}`)
        .then((res) => {
          if (res.data.errno === -1) {
            this.$message.error(res.data.message);
            setTimeout(() => {
              this.$router.replace('/');
            }, 1000);
          } else {
            this.article = processArticleObject(res.data.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    handleCommand(command) {
      if (!this.$userInfo) {
        this.$message.info('请先登录');
        return;
      }
      if (command === 'goToEditPage') this.goToEditPage();
      else if (command === 'deleteArticle') this.deleteArticle();
    },

    goToEditPage() {
      this.$router.push(`/write/${this.article.id}`);
    },

    deleteArticle() {
      this.$confirm('删除文章！是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => this.axios.delete(`/api/article/${this.article.id}`))
        .then((res) => {
          if (res.data.errno === -1) this.$message.error(res.data.message);
          else {
            this.$message.success('删除成功!');
            this.$router.replace('/');
          }
        })
        .catch((err) => {
          if (err === 'cancel' || err === 'close') this.$message.info('已取消删除');
          else {
            console.error(err);
            this.$message.error('删除失败');
          }
        });
    },
  },
};
</script>
