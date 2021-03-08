<template>
  <div class="block">
    <div class="title">{{ article.title }}</div>
    <div v-html="article.content" class="content"></div>
    <div class="footer">
      <span class="author">{{ article.authorName }}</span>
      <span class="time">{{ article.createTime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleBlock',
  props: {
    article: Object,
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin-bottom: 40px;
  text-align: left;

  .title {
    font-size: 1.5rem;
    padding-bottom: 6px;
  }

  .footer {
    padding: 6px 0 16px 0;
    font-size: 0.7em;
    line-height: 0.7em;
    .author {
      padding-right: 12px;
    }
    .time {
      color: darkgray;
    }
  }
}
</style>
