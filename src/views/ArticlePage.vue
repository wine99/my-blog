<template>
  <div class="article-page" v-if="article">
    <h1 class="title">{{ article.title }}</h1>
    <div class="info">
      <div class="author">{{ article.authorName }}</div>
      <div class="time">发布于：{{ article.createTime }}</div>
    </div>
    <div v-html="article.content" class="content"/>
  </div>
</template>

<style lang="scss" scoped>
.article-page {
  text-align: left;
  width: 75%;
  margin: auto;

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
</style>

<script>
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
