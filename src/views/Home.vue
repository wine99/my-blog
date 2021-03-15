<template>
  <div class="home">

    <div class="radio">
      <div class="radio-title">排序：</div>
      <el-radio-group v-model="reverseArticles">
        <el-radio :label="false" border>倒序</el-radio>
        <el-radio :label="true" border>正序</el-radio>
      </el-radio-group>
    </div>

    <el-timeline :reverse="reverseArticles">
      <el-timeline-item
        v-for="article in articles"
        :timestamp="article.createTime"
        placement="top"
        :key="article.id"
      >
        <el-card>
          <h2 class="title" @click="goToArticlePage" :id="article.id">{{ article.title }}</h2>
          <p class="summary">{{ article.summary }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 75%;
  margin: auto auto 20px;
  text-align: left;

  .radio {
    padding: 0 0 20px 40px;
    display: flex;
    align-items: center;

    .radio-title {
      margin-right: 20px;
    }
  }

  .title {
    cursor: pointer;
  }

  .summary {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
}

</style>

<script>
import { processArticleObject } from '../helpers/helpers';

export default {
  name: 'Home',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getAllArticles();
    });
  },

  data() {
    return {
      reverseArticles: false,
      articles: [],
    };
  },

  methods: {
    getAllArticles() {
      this.axios
        .get('/api/article/all')
        .then((res) => {
          if (res.data.errno === -1) {
            this.$message(res.data.message);
          } else {
            let articles = res.data.data;
            articles = articles.map((article) => processArticleObject(article));
            articles.forEach((article) => {
              // eslint-disable-next-line no-param-reassign
              article.summary = article.content.replace(/<[^>]+>/g, '');
            });
            this.articles = articles;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    goToArticlePage(e) {
      this.$router.push(`/article/${e.target.id}`);
    },
  },
};
</script>
