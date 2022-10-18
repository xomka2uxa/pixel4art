<template>
  <div class="main">
    <first-main-app />
    <tabs-screen-app />
    <posts-app />
  </div>
</template>

<script>
import FirstMainApp from "@/components/main/FirstMainApp.vue";
import TabsScreenApp from "/components/main/TabsScreenApp.vue";
import PostsApp from "@/components/main/PostsApp.vue";

export default {
  name: "HomeView",

  components: {
    FirstMainApp,
    TabsScreenApp,
    PostsApp,
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
  margin-bottom: 120px;
}
</style>
