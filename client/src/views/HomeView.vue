<template>
  <div class="main">
    <first-main-app />
  </div>
</template>

<script>
import FirstMainApp from "@/components/main/FirstMainApp.vue";

export default {
  name: "HomeView",

  components: {
    FirstMainApp,
  },

  mounted() {
    this.$store.dispatch("header/setHeaderTransparent", true);
    this.$store.dispatch("header/setHeaderCanClosed", false);
    this.$store.dispatch("header/setHeaderHideMobile", false);
  },
};
</script>

<style lang="scss" scoped></style>
