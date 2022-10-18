<template>
  <div class="wrapper">
    <header-app />
    <slot />
    <footer-app />
  </div>
</template>

<script>
import HeaderApp from "@/components/default/header-app/HeaderApp.vue";
import FooterApp from "@/components/default/FooterApp.vue";

export default {
  name: "DefaultLayout",

  inject: ["mq"],

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
