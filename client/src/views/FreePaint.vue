<template>
  <div v-bind:style="{ height: '100vh', width: '100vw' }" ref="container">
    <v-stage ref="stage" :config="stageSize">
      <v-layer>
        <v-rect
          v-for="(rect, i) in rectList"
          :key="i"
          :config="{
            ...rect
          }"
          @click="handleClick"
        />
      </v-layer>
      <v-layer ref="dragLayer"></v-layer>
    </v-stage>
  </div>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  data() {
    return {
      stageSize: {
        width,
        height,
      },
      rectList: [],
    };
  },
  created() {
    window.addEventListener('resize', this.changeRect);
    this.changeRect();

    this.rectList = [];
    let col = 1;
    let row = 1;
    let cnt = 1;

    for (let i = 1; i <= 100; i += 1) {
      cnt += 1;
      col += 1;
      this.rectList.push({
        x: 50 * col,
        y: 50 * row,
        width: 50,
        height: 50,
        stroke: '#000000',
        strokeWidth: 1,
      });

      if (cnt === 11) {
        row += 1;
        cnt = 1;
        col = 1;
      }
    }
  },
  methods: {
    changeRect() {
      const { container } = this.$refs;

      if (!container) {
        return;
      }

      const heightt = container.offsetHeight;
      const widtht = container.offsetWidth;

      this.stageSize.width = widtht;
      this.stageSize.height = heightt;
    },

    handleClick(event) {
      event.target.stroke('red');
      event.target.fill('red');
    },
  },
};
</script>
