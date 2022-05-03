<template>
  <div class="main">
    <div class="container">
      <first-section />
      <articles-list />
    </div>
  </div>
</template>

<script>
import FirstSection from '@/components/pages/home/FirstSection.vue';
import ArticlesList from '@/components/pages/home/ArticlesList.vue';

export default {
  name: 'HomeView',
  components: {
    FirstSection,
    ArticlesList,
  },
};
</script>

<style lang="scss">
  .row {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10px;
  }
  .col {
      position: relative;
      padding: 0 10px;
      width: auto;
  }
  .col-33 {
      width: 33.33%;
  }
  .btn-wrapper{
      justify-content: center;
      margin-bottom: 50px;
  }
  .btn {
      display: inline-block;
      background-color: cadetblue;
      padding: 8px;
      border-radius: 10px;
  }
  .btn:hover{
      background-color: rgb(83, 135, 136);
  }
  .btn:active{
      background-color: rgb(62, 102, 103);
      color: white;
  }
</style>
