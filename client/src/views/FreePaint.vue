<template>
  <div v-bind:style="{ height: '100vh', width: '100vw' }" ref="container">
    <v-stage
      ref="stage"
      :config="{...stageConfig}"
      @mousedown="handleClick"
      @mousemove="handleClick"
      @mouseup="handleClick"
    >
      <v-layer>
        <v-group
          ref="group"
          :config="{ ...groupConfig, draggable: isDragging }"
          @wheel="handleScale"
          @dragstart="handleDragStart"
          @dragmove="handleDragMove"
          @dragend="handleDragEnd"
        >
          <v-line
            v-for="(line, i) in vLineList"
            :key="i"
            :config="{
              ...line
            }"
          />
          <v-line
            v-for="(line, i) in hLineList"
            :key="i"
            :config="{
              ...line
            }"
          />
          <v-rect
            v-for="(rect, i) in rectList"
            :key="i"
            :config="{
              ...rect
            }"
          />
        </v-group>
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
      isClick: false,
      isDragging: true,
      isDraggingEdge: false,
      timer: undefined,
      stageConfig: {
        width,
        height,
      },
      groupConfig: {
        width: null,
        height: null,

      },
      beginPaintX: 0,
      beginPaintY: 0,
      paintSize: {
        pxSquare: 20,
        cols: 30,
        rows: 30,
      },
      vLineList: [],
      hLineList: [],
      rectList: [],
    };
  },
  created() {
    window.addEventListener('resize', this.changeRect);

    this.changeRect();
    this.initGroup();
    this.initVLineList();
    this.initHLineList();
    this.initRectList();
  },
  methods: {
    changeRect() {
      const { container } = this.$refs;

      if (!container) {
        return;
      }

      const heightt = container.offsetHeight;
      const widthtt = container.offsetWidth;

      this.stageConfig.width = widthtt;
      this.stageConfig.height = heightt;

      this.initGroup();
    },

    initGroup() {
      const defaultWidth = this.paintSize.pxSquare * this.paintSize.cols;
      const defaulHeight = this.paintSize.pxSquare * this.paintSize.rows;

      const percentWidthScale = this.stageConfig.width < 998
        ? this.stageConfig.width < 768 ? 0.9 : 0.8 : 0.6;
      const percentHeightScale = 0.9;

      let needSize = Math.floor(this.stageConfig.width * percentWidthScale);
      let needScale = needSize / defaultWidth;
      const isHeightGreater = defaulHeight * needScale
        > this.stageConfig.height * percentHeightScale;

      if (isHeightGreater) {
        needSize = Math.floor(this.stageConfig.height * percentHeightScale);
        needScale = needSize / defaulHeight;
      }

      this.beginPaintX = ((this.stageConfig.width) / 2)
        - ((this.paintSize.cols * this.paintSize.pxSquare * needScale) / 2);
      this.beginPaintY = ((this.stageConfig.height) / 2)
        - ((this.paintSize.rows * this.paintSize.pxSquare * needScale) / 2);
      const scale = { x: needScale, y: needScale };
      this.groupConfig = {
        width: defaultWidth,
        height: defaulHeight,
        x: this.beginPaintX,
        y: this.beginPaintY,
        scale,
      };
    },

    initVLineList() {
      let col = 0;
      const { pxSquare } = this.paintSize;

      for (let i = 0; i <= this.paintSize.cols; i += 1) {
        this.vLineList.push({
          x: 0,
          y: 0,
          points: [
            col,
            0,
            col,
            this.paintSize.rows * pxSquare,
          ],
          stroke: 'lightgray',
        });
        col += pxSquare;
      }
    },

    initHLineList() {
      let row = 0;
      const { pxSquare } = this.paintSize;

      for (let i = 0; i <= this.paintSize.rows; i += 1) {
        this.vLineList.push({
          x: 0,
          y: 0,
          points: [
            0,
            row,
            this.paintSize.cols * pxSquare,
            row,
          ],
          stroke: 'lightgray',
        });
        row += pxSquare;
      }
    },

    initRectList() {
      let col = 0;
      let row = 0;
      let cnt = 1;
      const { pxSquare } = this.paintSize;

      for (let i = 0; i < this.paintSize.cols * this.paintSize.rows; i += 1) {
        this.rectList.push({
          x: pxSquare * col,
          y: pxSquare * row,
          width: pxSquare,
          height: pxSquare,
        });

        cnt += 1;
        col += 1;

        if (cnt === this.paintSize.cols + 1) {
          row += 1;
          cnt = 1;
          col = 0;
        }
      }
    },

    timeoutDragStart() {
      const isDrag = () => {
        this.isDragging = false;
      };

      this.timer = setTimeout(isDrag, 100);
    },

    timeoutDragStop() {
      clearTimeout(this.timer);
    },

    handleScale(event) {
      if (event.evt) {
        event.evt.preventDefault();
        const scaleBy = 1.08;
        const maxScale = 3;
        const minScale = this.stageConfig.width < 998
          ? this.stageConfig.width < 768 ? 0.8 : 0.6 : 0.4;
        const { stage, group } = this.$refs;
        const oldScale = group.getNode().scaleX();
        const pointer = stage.getStage().getPointerPosition();

        const mousePointTo = {
          x: (pointer.x - group.getNode().x()) / oldScale,
          y: (pointer.y - group.getNode().y()) / oldScale,
        };

        const direction = event.evt.deltaY > 0 ? -1 : 1;

        const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        if ((direction > 0 && newScale < maxScale) || (direction < 0 && newScale > minScale)) {
          group.getNode().scale({ x: newScale, y: newScale });

          const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
          };
          group.getNode().position(newPos);
        }
      }
    },

    handleClick(event) {
      if (event.type === 'mousedown') {
        /* eslint no-param-reassign: "off" */
        event.evt.cancelBubble = true;
        this.isClick = true;
        this.timeoutDragStart();
      }
      if (event.type === 'mousemove') {
        this.timeoutDragStop();
      }
      if (event.type === 'mouseup') {
        if (this.getClassName(event.target) === 'Rect' && this.isClick && !this.isDragging && !this.isDraggingEdge) {
          event.target.fill('red');
        }
        this.isClick = false;
        this.isDragging = true;
        this.isDraggingEdge = false;
      }
      if (this.getClassName(event.target) === 'Rect' && this.isClick && !this.isDragging && !this.isDraggingEdge) {
        event.target.fill('red');
      }
    },

    handleDragStart() {
    },

    handleDragMove(event) {
      const minx = 0.15;
      const miny = 0.15;
      const maxx = 0.85;
      const maxy = 0.85;
      const noTopMove = event.target.y() + (event.target.height() * event.target.scaleY()) <= this.stageConfig.height * miny;
      const noRightMove = event.target.x() >= this.stageConfig.width * maxx;
      const noLeftMove = event.target.x() + (event.target.width() * event.target.scaleX()) < this.stageConfig.width * minx;
      const noBottomMove = event.target.y() >= this.stageConfig.height * maxy;

      if (noTopMove) event.target.y(event.target.y() + (this.stageConfig.height * 0.05));
      if (noRightMove) event.target.x(event.target.x() - (this.stageConfig.width * 0.05));
      if (noBottomMove) event.target.y(event.target.y() - (this.stageConfig.height * 0.05));
      if (noLeftMove) event.target.x(event.target.x() + (this.stageConfig.width * 0.05));
      if (noTopMove || noRightMove || noBottomMove || noLeftMove) {
        this.isDragging = false;
        this.isDraggingEdge = true;
      }
    },

    handleDragEnd() {
    },

    getClassName(obj) {
      // if the type is not an object return the type
      const type = typeof obj;
      if ((type !== 'object')) {
        return type;
      } // otherwise, access the class using obj.constructor.name
      return obj.constructor.name;
    },
  },
};
</script>
<!--
закрашивать если клик или маусемув и клавиша зажата ++++
// закрашвать на мобилах так же
центрировать по высоте и цирине ++++
перетаскивать всю картинку драг н дропом +++++
изменять масштаб по калесику +++
// и на мобиле по пальцам.

начальное состояние - это 60% от ширины экрана

ресайзить при изменении размера экрана и при ресайзе пересчитыватьь то, что выше

при перемещении не давать выходить за границы бльше чем на 80% от картинки

при масштабировании не давать уменьшать менее чем на 80% от ширины экрана

сделать выбор размера + задать свой
сделать выбор цвета
сделать запоминание цвета
-->
