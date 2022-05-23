<template>
  <div class="main">
    <p-canvas />
  </div>
</template>

<script>
import PCanvas from '@/components/blocks/PCanvas.vue';

export default {
  components: {
    PCanvas,
  },

  data() {
    return {
      canvas: null,
      ctx: null,
      canvasData: {
        cols: 80,
        rows: 60,
        squareSize: 20,
      },
      canvasStyle: {
        top: 0,
        left: 0,
        transform: 'scale(1, 1)',
      },
    };
  },

  mounted() {
  },

  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>
