<template>
  <div class="posts">
    <h1>Посты</h1>
    <table>
      <tr>
        <th>
          Заголовок
        </th>
        <th>
          Описание
        </th>
      </tr>
      <tr v-for='(post, i) in posts' :key='i'>
        <td>{{ post.title }}</td>
        <td>{{ post.description }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService';

export default {
  name: 'PostsView',

  data() {
    return {
      posts: [],
    };
  },

  methods: {
    async getPosts() {
      const response = await PostsService.fetchPosts();
      console.log(response, 333);
      this.posts = response.data;
    },
  },

  mounted() {
    this.getPosts();
  },
};
</script>
