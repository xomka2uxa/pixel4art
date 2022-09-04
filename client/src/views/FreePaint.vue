<template>
  <div class="main">
    <header-open />
    <app-canvas />
  </div>
</template>

<script>
import AppCanvas from "@/components/blocks/AppCanvas.vue";
import HeaderOpen from "@/components/default/header-app/HeaderOpen.vue";

export default {
  components: {
    AppCanvas,
    HeaderOpen,
  },

  data() {
    return {};
  },

  mounted() {
    this.$store.dispatch("setHeaderTransparent", false);
    this.$store.dispatch("setHeaderCanClose", true);
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
