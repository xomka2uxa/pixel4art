<template>
  <div class="main">
    <app-canvas />
  </div>
</template>

<script>
import AppCanvas from "@/components/blocks/AppCanvas.vue";

export default {
  components: {
    AppCanvas,
  },

  data() {
    return {};
  },

  mounted() {
    this.$store.dispatch("header/setHeaderTransparent", false);
    this.$store.dispatch("header/setHeaderCanClosed", true);
    this.$store.dispatch("header/setHeaderHideMobile", true);
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
