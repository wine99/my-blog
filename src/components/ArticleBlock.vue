<template>
  <div class="block">
    <div class="title">
      <span @click="goToArticlePage" style="cursor: pointer">{{ article.title }}</span>
    </div>
    <div v-html="content" class="content"></div>
    <div class="footer">
      <span class="author">{{ article.authorName }}</span>
      <span class="time">{{ article.createdAt }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.block {
  margin-bottom: 40px;
  text-align: left;

  .title {
    font-size: 1.2rem;
    padding-bottom: 10px;
  }

  .footer {
    padding: 12px 0 0;
    font-size: 0.6em;
    line-height: 0.6em;
    .author {
      padding-right: 12px;
    }
    .time {
      color: darkgray;
    }
  }

  .content {
    font-size: 0.8rem;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
}
</style>

<script>
export default {
  name: 'ArticleBlock',
  props: {
    article: Object,
  },
  computed: {
    content() {
      return this.article.content.replace(/<[^>]+>/g, '');
    },
  },
  methods: {
    goToArticlePage() {
      this.$router.push(`/article/${this.article.id}`);
    },
  },
};
</script>
