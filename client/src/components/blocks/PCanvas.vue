<template>
    <div class="container-canvas" ref="container-canvas">
      <canvas
        id="c"
        ref="c"
        :style="[canvasStyle]"
        @click="handleClick"
        @mousewheel="handleMouseWheel"
      >
      </canvas>
    </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      canvasConfig: {
        cols: 80,
        rows: 60,
        squareSize: 20,
        width: 0,
        height: 0,
        scale: 1,
        scaleBy: 1.08,
        maxScale: 3,
        minScale: 0.4,
      },
      canvasStyle: {
        top: 0,
        left: 0,
        transform: 'scale(1, 1)',
      },
    };
  },

  mounted() {
    window.addEventListener('resize', this.changeSizeCanvas);
    this.initCanvas();
    this.changeSizeCanvas();
    this.draw();
  },

  methods: {
    initCanvas() {
      this.canvas = this.$refs.c;
      this.ctx = this.canvas.getContext('2d');
      this.canvasConfig.width = this.canvasConfig.squareSize * this.canvasConfig.cols;
      this.canvas.width = this.canvasConfig.squareSize * this.canvasConfig.cols;
      this.canvasConfig.height = this.canvasConfig.squareSize * this.canvasConfig.rows;
      this.canvas.height = this.canvasConfig.squareSize * this.canvasConfig.rows;
    },

    draw() {
      let col = 0;
      let row = 0;
      let cnt = 1;
      for (let i = 0; i < this.canvasConfig.cols * this.canvasConfig.rows; i += 1) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(
          this.canvasConfig.squareSize * col,
          this.canvasConfig.squareSize * row,
          this.canvasConfig.squareSize,
          this.canvasConfig.squareSize,
        );
        cnt += 1;
        col += 1;

        if (cnt === this.canvasConfig.cols + 1) {
          row += 1;
          cnt = 1;
          col = 0;
        }
      }
    },

    changeSizeCanvas() {
      const percentWidthScale = window.innerWidth < 998
        ? window.innerWidth < 768 ? 0.9 : 0.8 : 0.6;
      const percentHeightScale = 0.9;

      //
      let needSize = Math.floor(this.canvasConfig.width * percentWidthScale);
      this.canvasConfig.scale = needSize / this.canvasConfig.width;

      const isWidthGreater = this.canvasConfig.width * this.canvasConfig.scale
        > window.innerWidth * percentWidthScale;

      if (isWidthGreater) {
        needSize = Math.floor(window.innerWidth * percentWidthScale);
        this.canvasConfig.scale = needSize / this.canvasConfig.width;
      }

      const isHeightGreater = this.canvasConfig.height * this.canvasConfig.scale
        > window.innerHeight * percentHeightScale;
      console.log(isWidthGreater, isHeightGreater, this.canvasConfig.height, this.canvasConfig.scale, percentHeightScale, 333);

      if (isHeightGreater) {
        needSize = Math.floor(window.innerHeight * percentHeightScale);
        this.canvasConfig.scale = needSize / this.canvasConfig.height;
      }

      // Считаем середину
      this.beginPaintX = ((window.innerWidth - (this.canvasConfig.width * this.canvasConfig.scale)) / 2)
        - ((this.canvasConfig.width * (1 - this.canvasConfig.scale)) / 2);
      this.beginPaintY = ((window.innerHeight - (this.canvasConfig.height * this.canvasConfig.scale)) / 2)
        - ((this.canvasConfig.height * (1 - this.canvasConfig.scale)) / 2);

      // Назначаем параметры
      this.canvasStyle.left = `${this.beginPaintX}px`;
      this.canvasStyle.top = `${this.beginPaintY}px`;
      this.canvasStyle.transform = `scale(${this.canvasConfig.scale}, ${this.canvasConfig.scale})`;
    },

    handleMouseWheel(e) {
      e.preventDefault();
      console.log(e);
      this.minScale = window.innerWidth < 998
        ? window.innerWidth < 768 ? 0.8 : 0.6 : 0.4;
      const direction = e.deltaY > 0 ? -1 : 1;
      const oldScale = this.canvasConfig.scale;
      const newScale = direction > 0 ? oldScale * this.canvasConfig.scaleBy : oldScale / this.canvasConfig.scaleBy;
      // const mousePointTo = {
      //   x: (pointer.x - group.getNode().x()) / oldScale,
      //   y: (pointer.y - group.getNode().y()) / oldScale,
      // };
      console.log(direction, newScale, this.canvasConfig.maxScale, this.canvasConfig.minScale, 888);
      if ((direction > 0 && newScale < this.canvasConfig.maxScale) || (direction < 0 && newScale > this.canvasConfig.minScale)) {
        console.log(newScale, this.canvasConfig.maxScale, this.canvasConfig.minScale, 888);
        this.canvasConfig.scale = newScale;
        this.canvasStyle.transform = `scale(${this.canvasConfig.scale}, ${this.canvasConfig.scale})`;
        // group.getNode().scale({ x: newScale, y: newScale });

        // const newPos = {
        //   x: pointer.x - mousePointTo.x * newScale,
        //   y: pointer.y - mousePointTo.y * newScale,
        // };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .container-canvas {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  canvas {
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid black;
    transition: transform .2s;
  }
</style>
