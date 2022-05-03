<template>
  <div class="articles__item">
    <h3>{{ post.title }}</h3>
    <img :src="post.image" alt=" ">
    <div class="text">{{ post.description }}</div>
    <a :href="post.url">Подробнее</a>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: ['post'],
};
</script>

<style lang="scss" scoped>
  .articles__item {
    background-color: beige;
    border: 1px solid grey;
    padding: 10px 30px;
    height: 100%;
    display: flex;
    flex-direction: column;

    h3 {
      text-align: center;
    }
    img {
      display: block;
      height: 100px;
      margin: 0 auto;
    }
    .text {
      margin: 20px 0;
    }
    a {
      background-color: rgb(64, 62, 57);
      padding: 8px;
      color: white;
      display: block;
      margin: 10px auto;
      width: 30%;
      text-align: center;
      margin-top: auto;
    }

  a:hover {
    background-color: rgb(87, 19, 19);
  }
      }
</style>
