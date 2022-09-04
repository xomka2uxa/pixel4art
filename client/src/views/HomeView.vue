<template>
  <div class="main"></div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: "HomeView",
  components: {
    //    HelloWorld,
  },

  mounted() {
    this.$store.dispatch("setHeaderTransparent", true);
    this.$store.dispatch("setHeaderCanClose", false);
  },
};
</script>

<style lang="scss" scoped>
.main {
  min-height: 500px;
  width: 100%;
  background-color: #000;
}
</style>
