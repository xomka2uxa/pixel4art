<template>
  <canvas
    id="c"
    ref="c"
    @click="handleClick"
  >
  </canvas>
</template>

<script>
export default {
  data() {
    return {
      vueCanvas: null,
      cnt: 20,
      canvasData: {
        cols: 20,
        rows: 20,
        squareSize: 20,
      },
      workCanvas: {},
      rectList: [
        {
          id: 1, x: 100, y: 100, color: 'red',
        },
        {
          id: 2, x: 120, y: 100, color: 'blue',
        },
        {
          id: 2, x: 140, y: 100, color: 'blue',
        },
      ],
    };
  },

  mounted() {
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    this.vueCanvas = ctx;

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const beginPaintX = ((canvas.width) / 2)
      - ((this.canvasData.cols * this.canvasData.squareSize) / 2);
    const beginPaintY = ((canvas.height) / 2)
      - ((this.canvasData.rows * this.canvasData.squareSize) / 2);

    this.workCanvas = {
      x: beginPaintX,
      y: beginPaintY,
      width: this.canvasData.cols * this.canvasData.squareSize,
      height: this.canvasData.rows * this.canvasData.squareSize,
    };

    this.draw();
    /*
      содаем массив объектов.
      отрисовывем его.

    */
  },

  methods: {
    handleClick(event) {
      for (let i = 0; i < this.rectList.length; i += 1) {
        const rect = this.rectList[i];
        console.log(event.x, rect.x, 777);
        if (event.x > rect.x && event.x < rect.x + 20) {
          this.rectList[i].color = 'green';
        }
      }

      this.draw();
    },

    draw() {
      for (let i = 0; i < this.rectList.length; i += 1) {
        const rect = this.rectList[i];
        this.vueCanvas.fillStyle = rect.color;
        this.vueCanvas.fillRect(rect.x, rect.y, 20, 20);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  canvas {
    border: 1px solid black;
  }
</style>
