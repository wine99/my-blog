import dayjs from 'dayjs';

// eslint-disable-next-line import/prefer-default-export
export function processArticleObject(article) {
  const { ...camel } = article;
  camel.createdAt = dayjs(article.created_at).format('YYYY-MM-DD');
  camel.authorName = article.username;
  return camel;
}
