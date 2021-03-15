<template>
  <div class="article-page" v-if="article">
    <link href="https://cdn.bootcdn.net/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css" rel="stylesheet">
    <!-- <link href="../assets/hljs.default.css" rel="stylesheet" > -->
    <div class="header">
      <h1 class="title">{{ article.title }}</h1>
      <div class="info">
        <div class="author">{{ article.authorName }}</div>
        <div class="time">发布于：{{ article.createdAt }}</div>
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
      margin-left: 20px;
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
      // eslint-disable-next-line no-param-reassign
      if (vm.article) vm.article = null;
      vm.getArticleDetail(vm.$route.params.id);
    });
  },
  methods: {
    getArticleDetail(id) {
      this.axios.get(`/api/article/${id}`)
        .then((res) => {
          if (res.data.errno === -1) {
            this.$message(res.data.message);
          } else {
            this.article = processArticleObject(res.data.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
