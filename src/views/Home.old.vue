<template>
  <div class="home">
    <ArticleBlock v-for="article in articles" :key="article.id" :article="article" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 75%;
  margin: auto auto 20px;
}
</style>

<script>
import ArticleBlock from '@/components/ArticleBlock.vue';
import { processArticleObject } from '../helpers/helpers';

export default {
  name: 'Home',
  components: {
    ArticleBlock,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getAllArticles();
    });
  },

  data() {
    return {
      articles: [],
    };
  },

  methods: {
    getAllArticles() {
      this.axios.get('/api/article/all')
        .then((res) => {
          if (res.data.errno === -1) {
            this.$message.error(res.data.message);
          } else {
            let articles = res.data.data;
            articles = articles.map((article) => processArticleObject(article));
            this.articles = articles;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
