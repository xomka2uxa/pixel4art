<template>
  <div>
    <div class="container-canvas" ref="containerCanvas">
      <canvas
        id="c"
        ref="c"
        @mousewheel="handleMouseWheel"
        @mousedown="handleCanvasEvent"
        @mouseup="handleCanvasEvent"
        @mousemove="handleCanvasEvent"
      ></canvas>
    </div>
    <left-sidebar
      :scale-in-prc="scaleInPrc"
      :colors-on-canvas="colorsOnCanvas"
      @do-scaling="doScaling"
      @replace-color-on-canvas="replaceColorOnCanvas"
    />
    <view-mode-tooltip v-if="isScaleInPrc" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getColorIndexInRectList, isRectUniqueFn } from "@/assets/js/utilsCanvas.js";
import LeftSidebar from "@/components/blocks/LeftSidebar.vue";
import ViewModeTooltip from "@/components/blocks/ViewModeTooltip.vue";
/*
проблемы канваса
3. В массиве не заменяется квадрат на том же месте а просто добавляется
4. Сделать удаление цвета из цветов на канвасе если их нет

5. при выходе мыши за канвас если рисовали то надо продолжать рисовать если перемещали то продолжать перемещать
6. Переписать события из саййдбара без стора

7. попробовать переводить в рисунок часть картинки
8. Подставлять вместо квадратов и линий картинку если меньше одного пикселя
9. Рефаторинг
== Улучшения ==
сделать линии свг или на другом канвасе
*/
export default {
  components: {
    LeftSidebar,
    ViewModeTooltip,
  },

  data() {
    return {
      canvas: null,
      ctx: null,
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
      timer: null,
      beginMovePaint: false,
      rectListHistory: { cnt: 0, arr: [] },
      scaleInPrc: 0,
      isScaleInPrc: false,
      colorsOnCanvas: [],
    };
  },

  mounted() {
    window.addEventListener("resize", this.changeSizeCanvas);
    this.cc.cols = this.selectedSizePaint.value[0];
    this.cc.rows = this.selectedSizePaint.value[1];
    this.initCanvas();
    this.changeSizeCanvas();
    this.draw();
  },

  watch: {
    "$store.state.selectedSizePaint": {
      handler(val) {
        this.rectList = [];
        this.cc.cols = val.value[0];
        this.cc.rows = val.value[1];

        this.changeSizeCanvas();
      },
      deep: true,
    },

    "$store.state.isCanvasClean": function (val) {
      if (val) {
        this.rectList = [];
        this.rectListHistory = { cnt: 0, arr: [] };
        this.changeSizeCanvas();
        this.$store.dispatch("setCanvasClean", false);
      }
    },

    "$store.state.isUndoLastAction": function (val) {
      if (val && this.rectListHistory.arr.length && !this.rectListHistory.arr[0].isHistory) {
        const index = this.rectListHistory.cnt;
        this.rectListHistory.arr[index].isHistory = true;
        for (let i = 0; i < this.rectList.length; i++) {
          if (this.rectList[i].color == this.rectListHistory.arr[index].color) {
            this.rectList[i].arr.pop();
          }
        }

        this.rectListHistory.cnt--;
      }

      this.$store.dispatch("undoLastAction", false);
    },

    "$store.state.isReturnFromHistoryList": function (val) {
      if (val && this.rectListHistory.arr.at(-1).isHistory) {
        this.rectListHistory.cnt++;
        const index = this.rectListHistory.cnt;

        if (this.rectListHistory.arr.length) {
          this.rectListHistory.arr[index].isHistory = false;

          for (let i = 0; i < this.rectList.length; i++) {
            if (this.rectList[i].color == this.rectListHistory.arr[index].color) {
              this.rectList[i].arr.push(this.rectListHistory.arr[index].arr);
            }
          }
        }
      }
      this.$store.dispatch("returnFromHistoryList", false);
    },
  },

  computed: {
    ...mapGetters(["selectedColor", "selectedSizePaint", "isCanvasClean", "cntHistoryAction", "historyMode"]),
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
      }
      const container = this.$refs.containerCanvas;
      this.cc.width = container?.offsetWidth || this.cc.width;
      this.cc.height = container?.offsetHeight || this.cc.height;
      this.canvas.width = container?.offsetWidth || this.canvas.width;
      this.canvas.height = container?.offsetHeight || this.canvas.height;
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
      this.ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
      this.ctx.lineWidth = 1;
      this.ctx.fillRect(this.gc.x, this.gc.y, this.gc.width, this.gc.height);
      this.ctx.strokeRect(this.gc.x, this.gc.y, this.gc.width, this.gc.height);
    },

    drawLines() {
      const squareSize = this.isScaleInPrc ? this.cc.squareSize * this.cc.scale : this.cc.squareSize + this.cc.scale;
      this.ctx.beginPath();
      for (let i = 0; i < this.cc.rows + 1; i++) {
        this.ctx.moveTo(this.gc.x, this.gc.y + i * squareSize);
        this.ctx.lineTo(this.gc.x + this.gc.width, this.gc.y + i * squareSize);
      }

      for (let i = 0; i < this.cc.cols + 1; i++) {
        this.ctx.moveTo(this.gc.x + i * squareSize, this.gc.y);
        this.ctx.lineTo(this.gc.x + i * squareSize, this.gc.y + this.gc.height);
      }

      this.ctx.strokeStyle = "#000";
      this.ctx.lineWidth = squareSize / 20;
      this.ctx.stroke();
    },

    drawRectList() {
      // const date1 = Date.now();
      const squareSize = this.isScaleInPrc ? this.cc.squareSize * this.cc.scale : this.cc.squareSize + this.cc.scale;
      for (let i = 0; i < this.rectList.length; i++) {
        this.ctx.fillStyle = this.rectList[i].color;
        for (let j = 0; j < this.rectList[i].arr.length; j++) {
          for (let k = 0; k < this.rectList[i].arr[j].length; k++) {
            const x = this.gc.x + this.rectList[i].arr[j][k].col * squareSize;
            const y = this.gc.y + this.rectList[i].arr[j][k].row * squareSize;
            if (this.isSquareVisible(x, y, squareSize)) this.ctx.fillRect(x, y, squareSize, squareSize);
          }
        }
      }
      // const date2 = Date.now();
      // console.log((date2 - date1) / 1000);
    },

    isSquareVisible(x, y, squareSize) {
      let sizeX = x + squareSize;
      let sizeY = y + squareSize;
      if (sizeX > this.cc.x && x < this.cc.width && sizeY > this.cc.y && y < this.cc.height) return true;
      return false;
    },

    drawRect(e) {
      if (!this.isScaleInPrc) {
        const shiftX = e.offsetX - this.gc.x;
        const realSquareSizeX = this.gc.width / this.cc.cols;
        const shiftRectX = Math.floor(shiftX / realSquareSizeX);

        const shiftY = e.offsetY - this.gc.y;
        const realSquareSizeY = this.gc.height / this.cc.rows;
        const shiftRectY = Math.floor(shiftY / realSquareSizeY);
        const color = this.selectedColor;

        if (!this.colorsOnCanvas.includes(color)) {
          this.colorsOnCanvas.push(color);
        }

        const newRect = {
          col: shiftRectX,
          row: shiftRectY,
        };

        console.log(this.rectList, 88);

        const colorIndex = getColorIndexInRectList(this.rectList, color);
        let isRectUnique = isRectUniqueFn(this.rectList, color, newRect);

        if (isRectUnique) {
          if (colorIndex == null) {
            this.rectList.push({
              color: color,
              arr: [[newRect]],
            });

            this.rectListHistory.arr.push({
              color,
              arr: [newRect],
              isHistory: false,
            });
          } else {
            if (!this.beginMovePaint) {
              this.rectList[colorIndex].arr.push([newRect]);
              this.rectListHistory.arr.push({
                color,
                arr: [newRect],
                isHistory: false,
              });
            } else {
              this.rectList[colorIndex].arr.at(-1).push(newRect);
              this.rectListHistory.arr.at(-1).arr.push(newRect);
            }
          }
        }

        if (this.rectListHistory.arr.length > 5) {
          this.rectListHistory.arr.shift();
        }

        this.rectListHistory.arr = this.rectListHistory.arr.filter((el) => {
          return !el.isHistory;
        });
        this.rectListHistory.cnt = this.rectListHistory.arr.length - 1;
        const squareSize = this.cc.squareSize + this.cc.scale;
        const x = this.gc.x + shiftRectX * squareSize;
        const y = this.gc.y + shiftRectY * squareSize;

        let imgd = this.ctx.getImageData(x, y, 1, 1);
        // const clickColor = `rgb(${imgd.data[0]}, ${imgd.data[1]}, ${imgd.data[2]})`;
        console.log(this, 777);

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, squareSize, squareSize);

        this.ctx.fillStyle = `rgb(${imgd.data[0]}, ${imgd.data[1]}, ${imgd.data[2]})`;
        this.ctx.fillRect(300, 300, squareSize, squareSize);
      }
    },

    handleCanvasEvent(e) {
      const areaGroup = this.isAreaGroup(e);
      if (areaGroup) {
        if (e.type === "mousedown") {
          this.cc.isClick = true;
          this.timeoutDragStart(e);
          this.cc.shiftX = e.offsetX - this.gc.x;
          this.cc.shiftY = e.offsetY - this.gc.y;
        }

        if (e.type === "mousemove" && this.cc.isClick) {
          this.timeoutDragStop();
          if (this.isDragging) {
            this.gc.x = e.offsetX - this.cc.shiftX;
            this.gc.y = e.offsetY - this.cc.shiftY;
            this.leavePicOnCanvas();
          } else {
            this.drawRect(e);
            if (!this.beginMovePaint) this.beginMovePaint = true;
          }
        }

        if (e.type === "mouseup") {
          this.cc.isClick = false;
          this.timeoutDragStop();
          this.isDragging = true;
          this.beginMovePaint = false;
        }
      } else {
        this.cc.isClick = false;
        this.timeoutDragStop();
        this.isDragging = true;
        this.beginMovePaint = false;
      }
    },

    handleMouseWheel(e) {
      if (this.isAreaGroup(e)) {
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
        console.log(this.isScaleInPrc, this.cc.scale);
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

    clearCanvas() {
      this.ctx.clearRect(0, 0, this.cc.width, this.cc.height);
    },

    isAreaGroup(e) {
      return (
        e.offsetX > this.gc.x &&
        e.offsetX < this.gc.x + this.gc.width &&
        e.offsetY > this.gc.y &&
        e.offsetY < this.gc.y + this.gc.height
      );
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

      for (let i = 0; i < this.rectListHistory.arr.length; i++) {
        if (this.rectListHistory.arr[i].color == oldColor) {
          this.rectListHistory.arr[i].color = newColor;
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
}
</style>
