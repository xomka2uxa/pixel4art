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
    this.$store.dispatch("setHeaderTransparent", false);
    this.$store.dispatch("setHeaderCanClose", true);
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
