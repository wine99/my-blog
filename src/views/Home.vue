<template>
  <div class="home">
    <ArticleBlock v-for="article in articles" :key="article.id" v-bind:article="article" />
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
import { articles } from '../fake-data';

export default {
  name: 'Home',
  components: {
    ArticleBlock,
  },
  data() {
    return {
      articles: articles.map((item) => {
        const { ...article } = item;
        article.createTime = dayjs(article.createTime).format('YYYY-MM-DD');
        return article;
      }),
    };
  },
};
</script>
