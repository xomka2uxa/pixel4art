<template>
  <div id="container-canvas" ref="container" :style="{ height: '100vh', width: '100vw' }">
    <div id="canvas"></div>
  </div>
</template>

<script>
import Konva from 'konva';

export default {
  data() {
    return {
      stage: null,
      layer: null,
      group: null,
      circle: null,
      vLineList: [],
      hLineList: [],
      rectList: [],
      paintSize: {
        pxSquare: 20,
        cols: 50,
        rows: 50,
      },
      beginPaintX: 0,
      beginPaintY: 0,
    };
  },

  mounted() {
    this.stage = new Konva.Stage({
      container: 'canvas',
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.layer = new Konva.Layer();
    this.group = new Konva.Group();

    // this.initVLineList();
    // this.initHLineList();
    this.initRectList();

    // circle.on('click', () => {
    //   alert('You clicked the circle!');
    //   /* eslint no-param-reassign: "off" */
    //   // evt.cancelBubble = true;
    // });

    // group.on('click', () => {
    //   alert('You clicked on the group!');
    // });

    // layer.on('click', () => {
    //   alert('You clicked on the layer!');
    // });
    const time = Date.now();
    this.layer.add(this.group);

    // add the layer to the stage
    this.stage.add(this.layer);

    window.addEventListener('resize', this.changeRect);
    this.initGroup();
    console.log(Date.now() - time, 777);
  },

  methods: {
    changeRect() {
      const { container } = this.$refs;
      if (!container) {
        return;
      }

      const width = container.offsetWidth;
      const height = container.offsetHeight;

      this.stage.width(width);
      this.stage.height(height);

      this.initGroup();
    },

    initGroup() {
      const defaultWidth = this.paintSize.pxSquare * this.paintSize.cols;
      const defaulHeight = this.paintSize.pxSquare * this.paintSize.rows;

      const percentWidthScale = this.stage.width() < 998
        ? this.stage.width() < 768 ? 0.9 : 0.8 : 0.6;
      const percentHeightScale = 0.9;

      let needSize = Math.floor(this.stage.width() * percentWidthScale);
      let needScale = needSize / defaultWidth;
      const isHeightGreater = defaulHeight * needScale
        > this.stage.height() * percentHeightScale;

      if (isHeightGreater) {
        needSize = Math.floor(this.stage.height() * percentHeightScale);
        needScale = needSize / defaulHeight;
      }

      this.beginPaintX = ((this.stage.width()) / 2)
        - ((this.paintSize.cols * this.paintSize.pxSquare * needScale) / 2);
      this.beginPaintY = ((this.stage.height()) / 2)
        - ((this.paintSize.rows * this.paintSize.pxSquare * needScale) / 2);
      const scale = { x: needScale, y: needScale };
      this.group.width(defaultWidth);
      this.group.height(defaulHeight);
      this.group.x(this.beginPaintX);
      this.group.y(this.beginPaintY);
      console.log(this.group);
      this.group.scale(scale);
    },

    initVLineList() {
      let col = 0;
      const { pxSquare } = this.paintSize;

      for (let i = 0; i <= this.paintSize.cols; i += 1) {
        const line = new Konva.Line({
          x: 0,
          y: 0,
          points: [
            col,
            0,
            col,
            this.paintSize.rows * pxSquare,
          ],
          strokeWidth: 1,
          stroke: 'lightgray',
        });
        this.vLineList.push(line);
        this.group.add(line);
        col += pxSquare;
      }
    },

    initHLineList() {
      let row = 0;
      const { pxSquare } = this.paintSize;

      for (let i = 0; i <= this.paintSize.rows; i += 1) {
        const line = new Konva.Line({
          x: 0,
          y: 0,
          points: [
            0,
            row,
            this.paintSize.cols * pxSquare,
            row,
          ],
          strokeWidth: 1,
          stroke: 'lightgray',
        });
        this.hLineList.push(line);
        this.group.add(line);
        row += pxSquare;
      }
    },

    initRectList() {
      let col = 0;
      let row = 0;
      let cnt = 1;
      const { pxSquare } = this.paintSize;
      const time = Date.now();
      const rect = new Konva.Rect({
        x: 0,
        y: 0,
        width: pxSquare,
        height: pxSquare,
        fill: 'red',
      });
      for (let i = 0; i < this.paintSize.cols * this.paintSize.rows; i += 1) {
        const clone = rect.clone({
          x: pxSquare * col,
          y: pxSquare * row,
        });
        clone.cache();
        this.rectList.push(clone);
        cnt += 1;
        col += 1;

        if (cnt === this.paintSize.cols + 1) {
          row += 1;
          cnt = 1;
          col = 0;
        }
      }
      this.layer.add(...this.rectList);
      console.log(Date.now() - time, 666);
    },
  },
};
</script>
