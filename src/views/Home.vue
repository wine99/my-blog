<template>
  <div class="home">
    <ArticleBlock v-for="article in articles" :key="article.id" :article="article" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 80%;
  margin: auto auto 20px;
}
</style>

<script>
import ArticleBlock from '@/components/ArticleBlock.vue';
import dayjs from 'dayjs';

export default {
  name: 'Home',
  components: {
    ArticleBlock,
  },
  mounted() {
    this.getAllArticles();
  },

  data() {
    return {
      articles: [],
    };
  },

  methods: {
    getAllArticles() {
      this.axios.get('/api/articles/all')
        .then((res) => {
          let articles = res.data;
          articles = articles.map((article) => {
            const { ...camel } = article;
            camel.createTime = dayjs(article.create_time).format('YYYY-MM-DD');
            camel.authorName = article.username;
            return camel;
          });
          this.$data.articles = articles;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
