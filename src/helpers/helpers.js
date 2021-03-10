import dayjs from 'dayjs';

// eslint-disable-next-line import/prefer-default-export
export function processArticleObject(article) {
  const { ...camel } = article;
  camel.createTime = dayjs(article.create_time).format('YYYY-MM-DD');
  camel.authorName = article.username;
  return camel;
}
