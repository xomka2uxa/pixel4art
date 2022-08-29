<template>
  <div class="wrapper">
    <header-app />
    <slot />
    <footer-app />
  </div>
</template>

<script>
import HeaderApp from "@/components/default/Header/HeaderApp.vue";
import FooterApp from "@/components/default/FooterApp.vue";

export default {
  name: "DefaultLayout",
  components: {
    HeaderApp,
    FooterApp,
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout";
    },
  },
};
</script>

<style lang="scss"></style>
