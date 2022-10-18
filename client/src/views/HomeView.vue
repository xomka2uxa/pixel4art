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
    this.$store.dispatch("header/setHeaderTransparent", true);
    this.$store.dispatch("header/setHeaderCanClosed", false);
    this.$store.dispatch("header/setHeaderHideMobile", false);
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
