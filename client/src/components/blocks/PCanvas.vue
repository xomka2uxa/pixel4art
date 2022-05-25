<template>
    <div
      class="container-canvas"
      ref="container-canvas"
      @mousewheel="handleMouseWheel"
      @mousedown="handleEvent"
      @mouseup="handleEvent"
      @mousemove="handleEvent"
    >
      <canvas
        id="c"
        ref="c"
        :style="[canvasStyle]"
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
        x: 0,
        y: 0,
        shiftX: 0,
        shiftY: 0,
        canMove: false,
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

      if (isHeightGreater) {
        needSize = Math.floor(window.innerHeight * percentHeightScale);
        this.canvasConfig.scale = needSize / this.canvasConfig.height;
      }

      // Считаем x y
      this.canvasConfig.x = ((window.innerWidth - (this.canvasConfig.width * this.canvasConfig.scale)) / 2);
      this.canvasConfig.y = ((window.innerHeight - (this.canvasConfig.height * this.canvasConfig.scale)) / 2);

      // Назначаем параметры
      this.canvasStyle.left = `${this.canvasConfig.x}px`;
      this.canvasStyle.top = `${this.canvasConfig.y}px`;
      this.canvasStyle.transform = `scale(${this.canvasConfig.scale}, ${this.canvasConfig.scale})`;
    },

    handleMouseWheel(e) {
      if (e.target.id === 'c') {
        e.preventDefault();
        this.minScale = window.innerWidth < 998
          ? window.innerWidth < 768 ? 0.8 : 0.6 : 0.4;
        const direction = e.deltaY > 0 ? -1 : 1;
        const oldScale = this.canvasConfig.scale;
        const newScale = direction > 0 ? oldScale * this.canvasConfig.scaleBy : oldScale / this.canvasConfig.scaleBy;

        if ((direction > 0 && newScale < this.canvasConfig.maxScale) || (direction < 0 && newScale > this.canvasConfig.minScale)) {
          // const mousePointTo = {
          //   x: (e.x - this.canvasConfig.x) / oldScale,
          //   y: (e.y - this.canvasConfig.y) / oldScale,
          // };

          // const newPos = {
          //   x: e.x - mousePointTo.x * newScale,
          //   y: e.y - mousePointTo.y * newScale,
          // };
          this.canvasConfig.scale = newScale;
          this.canvasStyle.transform = `scale(${this.canvasConfig.scale}, ${this.canvasConfig.scale})`;
          this.canvasConfig.x = ((window.innerWidth - (this.canvasConfig.width * this.canvasConfig.scale)) / 2);
          this.canvasConfig.y = ((window.innerHeight - (this.canvasConfig.height * this.canvasConfig.scale)) / 2);
          console.log(window.innerWidth, this.canvasConfig.width, this.canvasConfig.scale, 333);
          this.canvasStyle.left = `${this.canvasConfig.x}px`;
          this.canvasStyle.top = `${this.canvasConfig.y}px`;
        }
      }
    },

    handleEvent(e) {
      // console.log(e.type, e, 111);
      if (e.type === 'mousedown' && e.target.id === 'c') {
        this.canvasConfig.canMove = true;
        this.canvasConfig.shiftX = e.clientX - this.canvasConfig.x;
        this.canvasConfig.shiftY = e.clientY - this.canvasConfig.y;
      }

      if (e.type === 'mousemove' && this.canvasConfig.canMove) {
        // Считаем x y
        this.canvasConfig.x = e.pageX - this.canvasConfig.shiftX;
        this.canvasConfig.y = e.pageY - this.canvasConfig.shiftY;
        // Назначаем параметры
        this.canvasStyle.left = `${this.canvasConfig.x}px`;
        this.canvasStyle.top = `${this.canvasConfig.y}px`;
      }

      if (e.type === 'mouseup') {
        this.canvasConfig.canMove = false;
      }
      // const minx = 0.15;
      // const miny = 0.15;
      // const maxx = 0.85;
      // const maxy = 0.85;
      // const noTopMove = e.target.y + (e.target.height() * e.target.scaleY()) <= this.stageConfig.height * miny;
      // const noRightMove = e.target.x >= this.stageConfig.width * maxx;
      // const noLeftMove = e.target.x + (e.target.width() * e.target.scaleX()) < this.stageConfig.width * minx;
      // const noBottomMove = e.target.y >= this.stageConfig.height * maxy;

      // if (noTopMove) e.target.y(e.target.y + (this.stageConfig.height * 0.05));
      // if (noRightMove) e.target.x(e.target.x - (this.stageConfig.width * 0.05));
      // if (noBottomMove) e.target.y(e.target.y - (this.stageConfig.height * 0.05));
      // if (noLeftMove) e.target.x(e.target.x + (this.stageConfig.width * 0.05));
      // if (noTopMove || noRightMove || noBottomMove || noLeftMove) {
      //   this.isDragging = false;
      //   this.isDraggingEdge = true;
      // }
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
    // transition: transform .2s, left .2s, top .2s;
    transform-origin: 0 0;
  }
</style>
