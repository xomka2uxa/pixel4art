<template>
    <div
      class="container-canvas"
      ref="container-canvas"
      @mousewheel="handleMouseWheel"
      @mousedown="handleCanvasEvent"
      @mouseup="handleCanvasEvent"
      @mousemove="handleCanvasEvent"
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
        cols: 800,
        rows: 600,
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
        isClick: false,
      },
      canvasStyle: {
        top: 0,
        left: 0,
        transform: 'scale(1, 1)',
      },
      isClick: false,
      isDragging: true,
      timer: null,
    };
  },

  mounted() {
    window.addEventListener('resize', this.changeSizeCanvas);
    this.initCanvas();
    this.changeSizeCanvas();
    this.drawLines();
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

    drawLines() {
      this.ctx.beginPath();
      for (let i = 0; i < this.canvasConfig.rows + 1; i += 1) {
        this.ctx.moveTo(0, i * this.canvasConfig.squareSize);
        this.ctx.lineTo(this.canvasConfig.cols * this.canvasConfig.squareSize, i * this.canvasConfig.squareSize);
      }

      for (let i = 0; i < this.canvasConfig.cols + 1; i += 1) {
        this.ctx.moveTo(i * this.canvasConfig.squareSize, 0);
        this.ctx.lineTo(i * this.canvasConfig.squareSize, this.canvasConfig.rows * this.canvasConfig.squareSize);
      }

      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
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
          this.canvasStyle.left = `${this.canvasConfig.x}px`;
          this.canvasStyle.top = `${this.canvasConfig.y}px`;
        }
      }
    },

    timeoutDragStart(e) {
      const isDrag = () => {
        this.isDragging = false;
        this.drawRect(e);
      };

      this.timer = setTimeout(isDrag, 100);
    },

    timeoutDragStop() {
      clearTimeout(this.timer);
    },

    drawRect(e) {
      /*
      считаем, где нарисовать квадрат.
      надо взять положение мыши
      минус положение канваса.
      по горизонтали умножить количество строк на ширину квадрата
      */

      const shiftX = e.pageX - this.canvasConfig.x;
      const RealWidthCanvas = this.canvasConfig.cols * this.canvasConfig.squareSize * this.canvasConfig.scale;
      const realSquareSizeX = RealWidthCanvas / this.canvasConfig.cols;
      const shiftRectX = Math.floor(shiftX / realSquareSizeX);

      const shiftY = e.pageY - this.canvasConfig.y - 60;
      const RealHeightCanvas = this.canvasConfig.rows * this.canvasConfig.squareSize * this.canvasConfig.scale;
      const realSquareSizeY = RealHeightCanvas / this.canvasConfig.rows;
      const shiftRectY = Math.floor(shiftY / realSquareSizeY);
      // знаем разницу в положении. знаем шириниу канваса. вычитаем одно из другого. делим
      // умножаем

      //  let x = 0;
      //  let y = 0;
      console.log(shiftRectX * this.canvasConfig.squareSize, shiftRectY * this.canvasConfig.squareSize, 9999);
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(
        shiftRectX * this.canvasConfig.squareSize,
        shiftRectY * this.canvasConfig.squareSize,
        this.canvasConfig.squareSize,
        this.canvasConfig.squareSize,
      );
    },

    handleCanvasEvent(e) {
      if (e.type === 'mousedown' && e.target.id === 'c') {
        this.canvasConfig.isClick = true;
        this.timeoutDragStart(e);
        this.canvasConfig.shiftX = e.clientX - this.canvasConfig.x;
        this.canvasConfig.shiftY = e.clientY - this.canvasConfig.y;
      }

      if (e.type === 'mousemove' && this.canvasConfig.isClick) {
        this.timeoutDragStop();
        if (this.isDragging) {
          // Считаем x y
          this.canvasConfig.x = e.pageX - this.canvasConfig.shiftX;
          this.canvasConfig.y = e.pageY - this.canvasConfig.shiftY;
          // Назначаем параметры
          this.canvasStyle.left = `${this.canvasConfig.x}px`;
          this.canvasStyle.top = `${this.canvasConfig.y}px`;
        } else {
          this.drawRect(e);
        }
      }

      if (e.type === 'mouseup') {
        this.canvasConfig.isClick = false;
        this.isDragging = true;
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
    // transition: transform .2s, left .2s, top .2s;
    transform-origin: 0 0;
  }
</style>
