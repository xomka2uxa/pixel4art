<template>
  <div>
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
    <div class="left-sidebar">
      <div class="left-sidebar__inner">
        <div class="choose-color">
          <Popper>
            <button>Выбрать цвет</button>
            <template #content>
              <color-picker color="#fff" default-format="hex" class="color-picker" @color-change="updateColor">
                <template #copy-button>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                  >
                    <path
                      d="M5 0v2H1v13h12v-3h-1v2H2V5h10v3h1V2H9V0zm1 1h2v2h3v1H3V3h3z"
                      fill="currentColor"
                    />

                    <path
                      d="M10 7v2h5v2h-5v2l-3-3zM3 6h5v1H3zm0 2h3v1H3zm0 2h3v1H3zm0 2h5v1H3z"
                      fill="currentColor"
                    />
                  </svg>
                </template>

                <template #format-switch-button>
                  <span class="sr-only">Выбрать формат</span>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                  >
                    <path
                      d="M8 15l5-5-1-1-4 2-4-2-1 1zm4-9l1-1-5-5-5 5 1 1 4-2z"
                      fill="currentColor"
                    />
                  </svg>
                </template>
              </color-picker>
            </template>
          </Popper>
        </div>
        <hr>
        <div class="colors">
          <p>Палитра</p>
          <div v-if="colorsList.length" class="colors-list">
            <div
              v-for="(color, idx) in colorsList"
              :key="idx"
              :class="['colors-item', {selected: color == currentColor}]"
              :style="['background:' + color]"
              @click="chooseCurrentColor(color)"
            ></div>
          </div>
          <div class="colors-btn">
            <button @click="addColorList">Доб-ть</button>
            <button @click="deleteColorList">Уд-ть</button>
          </div>
        </div>
        <hr>
        <div class="sizes">
          <p>Размеры</p>
          <select @change="changeSize">
            <option value="1">30 x 30</option>
            <option value="2">50 x 50</option>
            <option value="3">100 x 100</option>
            <option value="4">Свой вариант</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ColorPicker } from 'vue-accessible-color-picker';
import Popper from 'vue3-popper';

const width = window.innerWidth;
const height = window.innerHeight;

export default {
  components: {
    ColorPicker,
    Popper,
  },

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
      paintSizeList: [
        {
          value: 1,
          cols: 30,
          rows: 30,
        },
        {
          value: 2,
          cols: 50,
          rows: 50,
        },
        {
          value: 3,
          cols: 100,
          rows: 100,
        },
      ],
      vLineList: [],
      hLineList: [],
      rectList: [],
      colorsList: [],
      currentColor: '',
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
          event.target.fill(this.currentColor);
        }
        this.isClick = false;
        this.isDragging = true;
        this.isDraggingEdge = false;
      }
      if (this.getClassName(event.target) === 'Rect' && this.isClick && !this.isDragging && !this.isDraggingEdge) {
        event.target.fill(this.currentColor);
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

    updateColor(eventData) {
      this.currentColor = eventData.cssColor;
    },

    addColorList() {
      if (!this.colorsList.includes(this.currentColor)) {
        this.colorsList.push(this.currentColor);
      }
    },

    chooseCurrentColor(color) {
      this.currentColor = color;
    },

    deleteColorList() {
      this.colorsList = this.colorsList.filter((el) => this.currentColor !== el);
      this.currentColor = '#fff';
    },

    changeSize(event) {
      if (event.target.value !== 4) {
        const currSize = this.paintSizeList.find((el) => +el.value === +event.target.value);
        console.log(currSize, 999);
        this.paintSize.cols = 768;
        this.paintSize.rows = 576;
      }
      this.beginPaintX = 0;
      this.beginPaintY = 0;
      this.vLineList = [];
      this.hLineList = [];
      this.rectList = [];
      this.stageConfig = {
        width,
        height,
      };
      this.groupConfig = {
        width: null,
        height: null,
      };
      const list = this.$refs.group.getNode().children;
      const rects = list.filter((rect) => this.getClassName(rect) === 'Rect');
      console.log(rects, 8);
      rects.forEach((element) => element.fill('rgba(0, 0, 0, 0)'));
      this.changeRect();
      this.initGroup();
      this.initVLineList();
      this.initHLineList();
      this.initRectList();
    },
  },
};
</script>
<style lang="scss" scoped>
  .left-sidebar {
    position: fixed;
    width: 160px;
    top: 60px;
    left: 0;
    bottom: 0;
    background: rgb(246, 246, 246);
    padding: 10px;

    .color-picker {
      min-width: 300px;
    }

    .colors-list {
      padding: 0 0 10px 0;
      display: flex;
      flex-wrap: wrap;
    }

    .colors-item {
      position: relative;
      width: 20px;
      height: 20px;

      &.selected:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 3px solid rgba(0, 0, 0, .3);
      }
    }
  }
</style>

<!--

сделать выбор размера + задать свой
сделать выбор цвета
сделать запоминание цвета
-->
