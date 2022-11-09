<template>
  <div>
    <div class="container-canvas" ref="containerCanvas">
      <canvas id="cl" ref="cl" class="canvas"></canvas>
      <canvas
        id="c"
        ref="c"
        class="canvas"
        @mousewheel="handleMouseWheel"
        @mousedown="handleCanvasEvent"
        @mouseup="handleCanvasEvent"
        @mousemove="handleCanvasEvent"
      ></canvas>
    </div>
    <canvas-panel-left :colors-on-canvas="colorsOnCanvas" @replace-color-on-canvas="replaceColorOnCanvas" />
    <left-sidebar
      :scale-in-prc="scaleInPrc"
      :colors-on-canvas="colorsOnCanvas"
      @do-scaling="doScaling"
      @replace-color-on-canvas="replaceColorOnCanvas"
    />
    <canvas-panel-footer :historyList="rectListHistory.actions" :scale-in-prc="scaleInPrc" @do-scaling="doScaling" />
    <view-mode-tooltip v-if="isScaleInPrc" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getColorIndexInRectList } from "@/assets/js/utilsCanvas.js";
import LeftSidebar from "@/components/blocks/LeftSidebar.vue";
import CanvasPanelFooter from "@/components/blocks/CanvasPanelFooter.vue";
import CanvasPanelLeft from "@/components/blocks/CanvasPanelLeft.vue";
import ViewModeTooltip from "@/components/blocks/ViewModeTooltip.vue";
/*
Задачи
Усли модалка открыта, то на холсте не рисуем???
3. События мобилы
4. Делать адаптив
открытие модлок по быстрым клавишам
закрытие модалок по enter
5. попробовать переводить в рисунок часть картинки
6. Подставлять вместо квадратов и линий картинку если меньше одного пикселя
8. Сохранять в локалсторадже

Дебаггинг и рефакторинг - 
1.Переписать события из саййдбара без стора Не перерисовывать если не скейлю и не перетаскиваю.
2. Переписать кучи переменных которые я ввел для отслеживания событий
3. Вынести функции расчетов за компонент.
4. при выходе мыши за канвас если рисовали то надо продолжать рисовать если перемещали то продолжать перемещать
5. Использованные цвета сразу выводить в палитру
6. на мобиле масштабирование сделать по пальцам
*/
export default {
  components: {
    LeftSidebar,
    CanvasPanelFooter,
    ViewModeTooltip,
    CanvasPanelLeft,
  },

  data() {
    return {
      canvas: null,
      canvasL: null,
      ctx: null,
      ctxL: null,
      cc: {
        width: 0,
        height: 0,
        cols: 100,
        rows: 100,
        squareSize: 20,
        scale: 0,
        scaleBy: 1,
        x: 0,
        y: 0,
        shiftX: 0,
        shiftY: 0,
        isClick: false,
      },
      gc: {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
      rectList: [],
      isClick: false,
      isDragging: true,
      isBeginMove: false,
      timer: null,
      beginMovePaint: false,
      rectListHistory: { cnt: 0, actions: [] },
      scaleInPrc: 0,
      isScaleInPrc: false,
      colorsOnCanvas: [],
      drawRectXY: { x: 0, y: 0 },
    };
  },

  mounted() {
    window.addEventListener("resize", this.changeSizeCanvas);
    this.cc.cols = this.currentSizesPaint[0];
    this.cc.rows = this.currentSizesPaint[1];
    this.initCanvas();
    this.changeSizeCanvas();
    this.draw();
    this.$refs.c.addEventListener("touchstart", this.handleCanvasEventTouchStart, false);
    this.$refs.c.addEventListener("touchmove", this.handleCanvasEventTouchMove, false);
    this.$refs.c.addEventListener("touchend", this.handleCanvasEventTouchEnd, false);
  },

  watch: {
    "$store.state.currentSizesPaint": {
      handler(val) {
        this.rectList = [];
        this.cc.cols = val[0];
        this.cc.rows = val[1];
        this.$store.dispatch("setCanvasClean", true);
      },
      deep: true,
    },

    "$store.state.isCanvasClean": function (val) {
      if (val) {
        this.rectList = [];
        this.rectListHistory = { cnt: 0, actions: [] };
        this.colorsOnCanvas = [];
        this.changeSizeCanvas();
        this.$store.dispatch("setCanvasClean", false);
      }
    },

    "$store.state.isUndoLastAction": function (val) {
      if (val && this.rectListHistory.actions.length && !this.rectListHistory.actions[0].isHistory) {
        const index = this.rectListHistory.cnt;
        this.rectListHistory.actions[index].isHistory = true;
        this.rectListHistory.cnt--;
      }

      this.$store.dispatch("undoLastAction", false);
    },

    "$store.state.isReturnFromHistoryList": function (val) {
      if (val && this.rectListHistory.actions.at(-1)?.isHistory) {
        this.rectListHistory.cnt++;
        const index = this.rectListHistory.cnt;

        if (this.rectListHistory.actions.length) {
          this.rectListHistory.actions[index].isHistory = false;
        }
      }
      this.$store.dispatch("returnFromHistoryList", false);
    },
  },

  computed: {
    ...mapGetters([
      "selectedColor",
      "currentSizesPaint",
      "isCanvasClean",
      "colorPallete",
      "cntHistoryAction",
      "historyMode",
    ]),
  },

  methods: {
    draw() {
      if (this.isDragging) {
        this.clearCanvas();
        this.drawGroup();
        this.drawLines();
        this.drawRectList();
      }

      window.requestAnimationFrame(() => {
        this.draw();
      });
    },

    changeSizeCanvas() {
      this.isScaleInPrc = false;
      this.initCanvas(false);
      this.initScale();
      this.initGroup();
    },

    initCanvas(firstInit = true) {
      if (firstInit) {
        this.canvas = this.$refs.c;
        this.ctx = this.canvas.getContext("2d");
        this.canvasL = this.$refs.cl;
        this.ctxL = this.canvasL.getContext("2d");
      }
      const container = this.$refs.containerCanvas;
      this.cc.width = container?.offsetWidth || this.cc.width;
      this.cc.height = container?.offsetHeight || this.cc.height;
      this.canvas.width = container?.offsetWidth || this.canvas.width;
      this.canvas.height = container?.offsetHeight || this.canvas.height;
      this.canvasL.width = container?.offsetWidth || this.canvasL.width;
      this.canvasL.height = container?.offsetHeight || this.canvasL.height;
    },

    initScale() {
      const groupWidth = this.cc.cols * this.cc.squareSize;
      let groupHeight = this.cc.rows * this.cc.squareSize;

      const scaleWidth = (percentScale) => {
        this.cc.scale = -Math.ceil(
          (this.cc.squareSize - this.cc.squareSize / (groupWidth / this.cc.width)) * percentScale
        );
      };

      const scaleHeight = (percentScale) => {
        this.cc.scale = -Math.ceil(
          (this.cc.squareSize - this.cc.squareSize / (groupHeight / this.cc.height)) * percentScale
        );
      };

      if (groupWidth > this.cc.width) {
        scaleWidth(1.1);

        if ((this.cc.squareSize + this.cc.scale) * this.cc.rows > this.cc.height) {
          scaleHeight(1.1);
        }
      } else if (groupHeight > this.cc.height) {
        scaleHeight(1.1);
      }

      if (this.cc.scale < -19) {
        this.cc.scale = -19;
      }
      this.scaleInPrc = Math.floor(((this.cc.squareSize + this.cc.scale) / this.cc.squareSize) * 100);
    },

    initGroup() {
      this.gc.width = this.cc.cols * (this.cc.squareSize + this.cc.scale);
      this.gc.height = this.cc.rows * (this.cc.squareSize + this.cc.scale);
      this.gc.x = Math.floor(this.cc.width / 2 - this.gc.width / 2);
      this.gc.y = Math.floor(this.cc.height / 2 - this.gc.height / 2);
    },

    drawGroup() {
      this.ctxL.strokeStyle = "rgba(0, 0, 0, 1)";
      this.ctxL.fillStyle = "rgba(255, 255, 255, 1)";
      this.ctxL.lineWidth = 1;
      this.ctxL.fillRect(this.gc.x, this.gc.y, this.gc.width, this.gc.height);
      this.ctxL.strokeRect(this.gc.x, this.gc.y, this.gc.width, this.gc.height);
    },

    drawLines() {
      const squareSize = this.isScaleInPrc ? this.cc.squareSize * this.cc.scale : this.cc.squareSize + this.cc.scale;
      this.ctxL.beginPath();
      for (let i = 0; i < this.cc.rows + 1; i++) {
        this.ctxL.moveTo(this.gc.x, this.gc.y + i * squareSize);
        this.ctxL.lineTo(this.gc.x + this.gc.width, this.gc.y + i * squareSize);
      }

      for (let i = 0; i < this.cc.cols + 1; i++) {
        this.ctxL.moveTo(this.gc.x + i * squareSize, this.gc.y);
        this.ctxL.lineTo(this.gc.x + i * squareSize, this.gc.y + this.gc.height);
      }

      this.ctxL.strokeStyle = "#000";
      this.ctxL.lineWidth = squareSize / 20;
      this.ctxL.stroke();
    },

    drawRectList() {
      const squareSize = this.isScaleInPrc ? this.cc.squareSize * this.cc.scale : this.cc.squareSize + this.cc.scale;

      for (let i = 0; i < this.rectList.length; i++) {
        this.ctx.fillStyle = this.rectList[i].color;
        for (let rect in this.rectList[i].rects) {
          const x = this.gc.x + this.rectList[i].rects[rect].col * squareSize;
          const y = this.gc.y + this.rectList[i].rects[rect].row * squareSize;
          if (this.isSquareVisible(x, y, squareSize)) this.ctx.fillRect(x, y, squareSize, squareSize);
        }
      }

      for (let i = 0; i < this.rectListHistory.actions.length; i++) {
        if (!this.rectListHistory.actions[i].isHistory) {
          this.ctx.fillStyle = this.rectListHistory.actions[i].color;
          for (let rect in this.rectListHistory.actions[i].rects) {
            const x = this.gc.x + this.rectListHistory.actions[i].rects[rect].col * squareSize;
            const y = this.gc.y + this.rectListHistory.actions[i].rects[rect].row * squareSize;
            if (this.isSquareVisible(x, y, squareSize)) {
              this.ctx.fillRect(x, y, squareSize, squareSize);
            }
          }
        }
      }
    },

    isSquareVisible(x, y, squareSize) {
      let sizeX = x + squareSize;
      let sizeY = y + squareSize;
      if (sizeX > this.cc.x && x < this.cc.width && sizeY > this.cc.y && y < this.cc.height) return true;
      return false;
    },

    drawRect(x, y) {
      console.log(11);
      let lx = x;
      let ly = y;
      if (!this.isScaleInPrc) {
        const color = this.selectedColor;
        if (!this.colorsOnCanvas.includes(color)) {
          this.colorsOnCanvas.push(color);
        }

        const newRect = this.getRectCoords(lx, ly);
        const idx = `x:${newRect.col}y:${newRect.row}`;
        const squareSize = this.cc.squareSize + this.cc.scale;

        const x = this.gc.x + newRect.col * squareSize;
        const y = this.gc.y + newRect.row * squareSize;
        let imgd = this.ctx.getImageData(x, y, 1, 1);
        const colorOnCanvas = `rgb(${imgd.data[0]}, ${imgd.data[1]}, ${imgd.data[2]})`;
        if (colorOnCanvas !== "rgb(0, 0, 0)" && colorOnCanvas !== color) {
          newRect.prevColor = colorOnCanvas;
        }

        if (colorOnCanvas !== color) {
          if (!this.beginMovePaint) {
            this.rectListHistory.actions.push({
              color,
              rects: { [idx]: newRect },
              isHistory: false,
            });
          } else {
            this.rectListHistory.actions.at(-1).rects[idx] = newRect;
          }
        }

        if (this.rectListHistory.actions.length > 5) {
          const colorIndex = getColorIndexInRectList(this.rectList, this.rectListHistory.actions[0].color);
          if (colorIndex == null) {
            this.rectList.push({
              color: this.rectListHistory.actions[0].color,
              rects: { ...this.rectListHistory.actions[0].rects },
            });
          } else {
            this.rectList[colorIndex].rects = {
              ...this.rectList[colorIndex].rects,
              ...this.rectListHistory.actions[0].rects,
            };
          }
          for (let rect in this.rectListHistory.actions[0].rects) {
            const prevColor = this.rectListHistory.actions[0].rects[rect].prevColor;
            if (prevColor) {
              this.rectList.forEach((rEl, i) => {
                if (prevColor === rEl.color) {
                  delete this.rectList[i].rects[rect];
                }
              });
            }
          }
          this.rectListHistory.actions.shift();
          let deleteColorFromCanvasOnColors = "";
          const rectList = this.rectList.filter((el) => {
            if (!Object.keys(el.rects).length) {
              deleteColorFromCanvasOnColors = el.color;
              return false;
            }
            return true;
          });
          if (deleteColorFromCanvasOnColors) {
            this.colorsOnCanvas = this.colorsOnCanvas.filter((el) => deleteColorFromCanvasOnColors != el);
          }
          this.rectList = rectList;
        }

        this.rectListHistory.actions = this.rectListHistory.actions.filter((el) => {
          return !el.isHistory;
        });
        this.rectListHistory.cnt = this.rectListHistory.actions.length - 1;

        this.drawRectOnCanvas(newRect);
      }
    },

    getRectCoords(offsetX, offsetY) {
      const shiftX = offsetX - this.gc.x;
      const realSquareSizeX = this.gc.width / this.cc.cols;
      const shiftRectX = Math.floor(shiftX / realSquareSizeX);

      const shiftY = offsetY - this.gc.y;
      const realSquareSizeY = this.gc.height / this.cc.rows;
      const shiftRectY = Math.floor(shiftY / realSquareSizeY);

      return {
        col: shiftRectX,
        row: shiftRectY,
      };
    },

    drawRectOnCanvas(newRect) {
      const color = this.selectedColor;

      const squareSize = this.cc.squareSize + this.cc.scale;
      const x = this.gc.x + newRect.col * squareSize;
      const y = this.gc.y + newRect.row * squareSize;

      let imgd = this.ctx.getImageData(x, y, 1, 1);
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, squareSize, squareSize);

      this.ctx.fillStyle = `rgb(${imgd.data[0]}, ${imgd.data[1]}, ${imgd.data[2]})`;
      this.ctx.fillRect(300, 300, squareSize, squareSize);
    },

    handleCanvasEventTouchStart(e) {
      e.preventDefault();
      this.drawRectXY.x = Math.floor(e.touches[0].pageX);
      this.drawRectXY.y = Math.floor(e.touches[0].pageY);
      const areaGroup = this.isAreaGroup(this.drawRectXY.x, this.drawRectXY.y);

      if (areaGroup) {
        this.isBeginMove = true;
        this.cc.isClick = true;
        this.timeoutDragStart(this.drawRectXY.x, this.drawRectXY.y);

        this.cc.shiftX = this.drawRectXY.x - this.gc.x;
        this.cc.shiftY = this.drawRectXY.y - this.gc.y;
      }
    },

    handleCanvasEventTouchMove(e) {
      console.log(e);
      e.preventDefault();
      let x = Math.floor(e.touches[0].pageX);
      let y = Math.floor(e.touches[0].pageY);
      const areaGroup = this.isAreaGroup(x, y);
      if (areaGroup) {
        this.timeoutDragStop();
        this.isBeginMove = false;
        if (this.isDragging) {
          this.gc.x = x - this.cc.shiftX;
          this.gc.y = y - this.cc.shiftY;
          this.leavePicOnCanvas();
        } else {
          if (!this.beginMovePaint) this.beginMovePaint = true;
          this.drawRect(x, y);
        }
      }
    },

    handleCanvasEventTouchEnd() {
      const areaGroup = this.isAreaGroup(Math.floor(this.drawRectXY.x), Math.floor(this.drawRectXY.y));
      if (areaGroup) {
        if (this.isBeginMove) {
          this.drawRect(this.drawRectXY.x, this.drawRectXY.y);
        }
        this.cc.isClick = false;
        this.timeoutDragStop();
        this.isDragging = true;
        this.beginMovePaint = false;
        this.isBeginMove = false;
      }
    },

    handleCanvasEvent(e) {
      console.log(e.type);
      const areaGroup = this.isAreaGroup(e.offsetX, e.offsetY);
      if (areaGroup) {
        if (e.type === "mousedown") {
          this.isBeginMove = true;
          this.cc.isClick = true;
          this.timeoutDragStart(e.offsetX, e.offsetY);
          let offsetX = e.offsetX;
          let offsetY = e.offsetY;

          this.cc.shiftX = offsetX - this.gc.x;
          this.cc.shiftY = offsetY - this.gc.y;
        }

        if (e.type === "mousemove" && this.cc.isClick) {
          this.timeoutDragStop();
          this.isBeginMove = false;
          if (this.isDragging) {
            this.gc.x = e.offsetX - this.cc.shiftX;
            this.gc.y = e.offsetY - this.cc.shiftY;
            this.leavePicOnCanvas();
          } else {
            if (!this.beginMovePaint) this.beginMovePaint = true;
            this.drawRect(e.offsetX, e.offsetY);
          }
        }

        if (e.type === "mouseup") {
          if (this.isBeginMove) {
            this.drawRect(e.offsetX, e.offsetY);
          }
          this.cc.isClick = false;
          this.timeoutDragStop();
          this.isDragging = true;
          this.beginMovePaint = false;
          this.isBeginMove = false;
        }
      } else {
        this.cc.isClick = false;
        this.timeoutDragStop();
        this.isDragging = true;
        this.beginMovePaint = false;
      }
    },

    handleMouseWheel(e) {
      if (this.isAreaGroup(e.offsetX, e.offsetY)) {
        e.preventDefault();
        const direction = e.deltaY > 0 ? -1 : 1;
        this.setNewScale(direction);
      }
    },

    doScaling(direction) {
      this.setNewScale(direction);
    },

    setNewScale(direction) {
      const container = this.$refs.containerCanvas;
      const setValue = () => {
        this.cc.scale = newScale;
        const newScquareSize = this.isScaleInPrc
          ? this.cc.squareSize * this.cc.scale
          : this.cc.squareSize + this.cc.scale;
        const oldWidth = this.gc.width;
        const oldHeight = this.gc.height;
        this.gc.width = this.cc.cols * newScquareSize;
        this.gc.height = this.cc.rows * newScquareSize;
        this.scaleInPrc = Math.floor((newScquareSize / this.cc.squareSize) * 100);

        this.gc.x -= (this.gc.width - oldWidth) / 2;
        this.gc.y -= (this.gc.height - oldHeight) / 2;
      };

      const oldScale = this.cc.scale;
      let newScale = oldScale;
      if (direction < 0 && !this.isScaleInPrc) {
        if (oldScale == -19) {
          const diffX = container.offsetWidth - this.gc.width;
          const diffY = container.offsetHeight - this.gc.height;
          if (diffX < 0 || diffY < 0) {
            newScale =
              diffX < diffY
                ? (container.offsetWidth * 0.9) / this.cc.cols / this.cc.squareSize
                : (container.offsetHeight * 0.9) / this.cc.rows / this.cc.squareSize;
            this.isScaleInPrc = true;
          }
        }

        if (oldScale > -19) {
          newScale = oldScale - this.cc.scaleBy;
        }
      }

      if (direction > 0) {
        if (this.isScaleInPrc) {
          newScale = -19;
          this.isScaleInPrc = false;
        } else if (!this.isScaleInPrc && oldScale < 20) {
          newScale = oldScale + this.cc.scaleBy;
        }
      }
      setValue();
      this.leavePicOnCanvas();
    },

    leavePicOnCanvas() {
      if (this.gc.y + this.gc.height < 50) this.gc.y = 70 - this.gc.height;
      if (this.gc.x + this.gc.width < 50) this.gc.x = 70 - this.gc.width;
      if (this.gc.x > this.cc.width - 50) this.gc.x = this.cc.width - 70;
      if (this.gc.y > this.cc.height - 50) this.gc.y = this.cc.height - 70;
    },

    timeoutDragStart(x, y) {
      const isDrag = () => {
        this.isDragging = false;

        this.drawRect(x, y);
      };

      this.timer = setTimeout(isDrag, 100);
    },

    timeoutDragStop() {
      clearTimeout(this.timer);
    },

    clearCanvas() {
      this.ctx.clearRect(0, 0, this.cc.width, this.cc.height);
      this.ctxL.clearRect(0, 0, this.cc.width, this.cc.height);
    },

    isAreaGroup(x, y) {
      return x > this.gc.x && x < this.gc.x + this.gc.width && y > this.gc.y && y < this.gc.y + this.gc.height;
    },

    replaceColorOnCanvas({ oldColor, newColor }) {
      for (let i = 0; i < this.rectList.length; i++) {
        if (this.rectList[i].color == oldColor) {
          this.rectList[i].color = newColor;
        }
      }

      for (let i = 0; i < this.colorsOnCanvas.length; i++) {
        if (this.colorsOnCanvas[i] == oldColor) {
          this.colorsOnCanvas[i] = newColor;
        }
      }

      for (let i = 0; i < this.rectListHistory.actions.length; i++) {
        if (this.rectListHistory.actions[i].color == oldColor) {
          this.rectListHistory.actions[i].color = newColor;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container-canvas {
  width: 100%;
  height: 100vh;
  background: rgb(230, 230, 230);

  .canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
