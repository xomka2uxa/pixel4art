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
    <left-sidebar />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import LeftSidebar from "@/components/blocks/LeftSidebar.vue";

/*
проблемы канваса
1. ограничить вылезание за эран при перемещении и масштабировании
2. сделать более плавным перемещение и масштабирование
3. закрашивать промежуточные квадраты при закрашивании
4. если в массиве такой квадрат уже есть то заменять его
5. убрать ошибку PCanvas2.vue?439a:92 Uncaught TypeError: Cannot read properties of null (reading 'offsetWidth')
6. при выходе мыши за канвас если рисовали то надо продолжать рисовать если перемещали то продолжать перемещать
*/

/*
  мне надо:
  - потом вырезать последний массив из рект листа и писать в историю
  - если появился новый нарисованный элемент то удаляем историю и обнуляем хистори коунт

*/
export default {
  components: {
    LeftSidebar,
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
        scale: 1,
        scaleBy: 1.08,
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
      rectListHistory: [],
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
        this.changeSizeCanvas();
        this.$store.dispatch("setCanvasClean", false);
      }
    },

    "$store.state.isUndoLastAction": function (val) {
      if (val && this.cntHistoryAction < 5) {
        if (this.rectList.length) {
          this.$store.dispatch("setCntHistoryAction", true);
          this.rectListHistory.push(this.rectList.at(-1));
          this.rectList.pop();
        }
        console.log(this.rectListHistory, 999);
        this.$store.dispatch("undoLastAction", false);
      }
    },

    "$store.state.isReturnFromHistoryList": function (val) {
      if (val && this.cntHistoryAction >= 0) {
        if (this.rectListHistory.length) {
          this.$store.dispatch("setCntHistoryAction", false);
          this.rectList.push(this.rectListHistory.at(-1));
          this.rectListHistory.pop();
        }

        this.$store.dispatch("returnFromHistoryList", false);
      }
    },
  },

  computed: {
    ...mapGetters([
      "selectedColor",
      "selectedSizePaint",
      "isCanvasClean",
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
      this.cc.width = container.offsetWidth;
      this.cc.height = container.offsetHeight;
      this.canvas.width = container.offsetWidth;
      this.canvas.height = container.offsetHeight;
    },

    initGroup() {
      this.gc.width = this.cc.cols * this.cc.squareSize * this.cc.scale;
      this.gc.height = this.cc.rows * this.cc.squareSize * this.cc.scale;
      this.gc.x = this.cc.width / 2 - this.gc.width / 2;
      this.gc.y = this.cc.height / 2 - this.gc.height / 2;
    },

    drawGroup() {
      this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
      this.ctx.rect(this.gc.x, this.gc.y, this.gc.width, this.gc.height);
      this.ctx.fill();
    },

    drawLines() {
      this.ctx.beginPath();
      for (let i = 0; i < this.cc.rows + 1; i++) {
        this.ctx.moveTo(
          this.gc.x,
          this.gc.y + i * this.cc.squareSize * this.cc.scale
        );
        this.ctx.lineTo(
          this.gc.x + this.gc.width,
          this.gc.y + i * this.cc.squareSize * this.cc.scale
        );
      }

      for (let i = 0; i < this.cc.cols + 1; i++) {
        this.ctx.moveTo(
          this.gc.x + i * this.cc.squareSize * this.cc.scale,
          this.gc.y
        );
        this.ctx.lineTo(
          this.gc.x + i * this.cc.squareSize * this.cc.scale,
          this.gc.y + this.gc.height
        );
      }

      this.ctx.strokeStyle = "#000";
      this.ctx.lineWidth = 1 * this.cc.scale;
      this.ctx.stroke();
    },

    drawRectList() {
      this.ctx.fillStyle = "red";
      for (let i = 0; i < this.rectList.length; i++) {
        for (let j = 0; j < this.rectList[i].length; j++) {
          this.ctx.fillStyle = this.rectList[i][j].color;
          this.ctx.fillRect(
            this.gc.x +
              this.rectList[i][j].col * (this.cc.squareSize * this.cc.scale),
            this.gc.y +
              this.rectList[i][j].row * (this.cc.squareSize * this.cc.scale),
            this.cc.squareSize * this.cc.scale,
            this.cc.squareSize * this.cc.scale
          );
        }
      }
    },

    drawRect(e) {
      if (this.historyMode) {
        this.rectListHistory = [];
        this.$store.dispatch("setHistoryMode", false);
        this.$store.dispatch("setCntHistoryAction", null);
      }
      const shiftX = e.offsetX - this.gc.x;
      const realSquareSizeX = this.gc.width / this.cc.cols;
      const shiftRectX = Math.floor(shiftX / realSquareSizeX);

      const shiftY = e.offsetY - this.gc.y;
      const realSquareSizeY = this.gc.height / this.cc.rows;
      const shiftRectY = Math.floor(shiftY / realSquareSizeY);
      const color = this.selectedColor;
      this.ctx.fillStyle = color;
      let isRectUnique = true;
      const newColor = {
        col: shiftRectX,
        row: shiftRectY,
        color,
      };

      for (let i = 0; i < this.rectList.length; i++) {
        for (let j = 0; j < this.rectList[i].length; j++) {
          if (JSON.stringify(this.rectList[i][j]) == JSON.stringify(newColor)) {
            isRectUnique = false;
          }
        }
      }

      if (isRectUnique) {
        if (!this.beginMovePaint) {
          this.rectList.push([newColor]);
        }
        this.rectList.at(-1).push(newColor);
      }

      /*
       как сделать чтобы после первого элемента при перетаскивании
       я не создавал новый массив
       задавать переменную которая говорит что это начала рисования многих элементов
      */

      this.ctx.fillRect(
        this.gc.x + shiftRectX * (this.cc.squareSize * this.cc.scale),
        this.gc.y + shiftRectY * (this.cc.squareSize * this.cc.scale),
        this.cc.squareSize * this.cc.scale,
        this.cc.squareSize * this.cc.scale
      );
    },

    initScale() {
      const percentScale = 0.9;
      const groupWidth = this.cc.cols * this.cc.squareSize;
      const groupHeight = this.cc.rows * this.cc.squareSize;
      let isNeedScaleWidth = false;

      if (groupHeight > this.cc.width) {
        this.cc.scale = (this.cc.width / groupWidth) * percentScale;
        isNeedScaleWidth = true;
      }

      if (isNeedScaleWidth && groupHeight * this.cc.scale > this.cc.height) {
        this.cc.scale = (this.cc.height / groupHeight) * percentScale;
      } else if (!isNeedScaleWidth && groupHeight > this.cc.height) {
        this.cc.scale = (this.cc.height / groupHeight) * percentScale;
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
        const container = this.$refs.containerCanvas;
        const direction = e.deltaY > 0 ? -1 : 1;

        const oldScale = this.cc.scale;
        const newScale =
          direction > 0
            ? oldScale * this.cc.scaleBy
            : oldScale / this.cc.scaleBy;

        const isCanScaleByUp =
          this.gc.width / this.cc.cols < this.cc.squareSize * 2;
        const diffX = container.offsetWidth - this.gc.width;
        const diffY = container.offsetHeight - this.gc.height;

        let isCanScaleByDown = null;
        if (
          this.cc.cols * this.cc.squareSize < container.offsetWidth &&
          this.cc.rows * this.cc.squareSize < container.offsetHeight
        ) {
          isCanScaleByDown =
            diffX < diffY
              ? this.gc.width > this.cc.cols * this.cc.squareSize
              : this.gc.height > this.cc.rows * this.cc.squareSize;
        } else {
          isCanScaleByDown =
            diffX < diffY
              ? this.gc.width > container.offsetWidth * 0.9
              : this.gc.height > container.offsetHeight * 0.9;
        }

        if (
          (direction > 0 && isCanScaleByUp) ||
          (direction < 0 && isCanScaleByDown)
        ) {
          this.cc.scale = newScale;
          const oldWidth = this.gc.width;
          const oldHeight = this.gc.height;
          this.gc.width = this.cc.cols * this.cc.squareSize * this.cc.scale;
          this.gc.height = this.cc.rows * this.cc.squareSize * this.cc.scale;

          this.gc.x -= (this.gc.width - oldWidth) / 2;
          this.gc.y -= (this.gc.height - oldHeight) / 2;
        }
      }
    },

    timeoutDragStart(e) {
      const isDrag = () => {
        this.isDragging = false;

        console.log(this.rectList);
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
