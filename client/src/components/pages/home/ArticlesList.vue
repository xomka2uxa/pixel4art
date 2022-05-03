<template>
  <div class="main-bottom articles">
    <h2>Наши статьи</h2>
    <div class="row articles__list">
      <div v-for="post in posts" :key="post.id" class="col col-33">
        <article-item :post="post" />
      </div>
    </div>
    <div class="row btn-wrapper">
      <a href="#" class="btn">Все статьи</a>
    </div>
    <div class="pagination"> </div>
  </div>
</template>

<script>
import ArticleItem from '@/components/pages/home/ArticleItem.vue';

export default {
  name: 'ArticlesList',
  components: {
    ArticleItem,
  },
  data() {
    return {
      posts: [
        {
          id: '1',
          title: 'Заголовок статьи',
          image: 'https://phonoteka.org/uploads/posts/2021-05/1622254995_4-phonoteka_org-p-piksel-art-lokatsii-krasivo-4.jpg',
          description: 'Принимая во внимание показатели успешности, базовый вектор развития представляет собой интересный эксперимент.',
          url: '#',
        },
        {
          id: '2',
          title: 'Заголовок статьи2',
          image: 'https://i.ytimg.com/vi/hvoNlOXbnM4/maxresdefault.jpg',
          description: 'Описание второй статьи',
          url: '#',
        },
        {
          id: '3',
          title: 'Заголовок статьи3',
          image: 'https://pbs.twimg.com/media/FBZhXopVgAEohmM.jpg',
          description: 'Описание третьей статьи',
          url: '#',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.articles {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
</style>
