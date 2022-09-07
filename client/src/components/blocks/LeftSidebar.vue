<template>
  <div class="left-sidebar" :class="[isHeaderHidden ? '_header-hidden' : '']">
    <div class="__inner">
      <div class="__box control-btn">
        <div class="row mx-5">
          <div class="col px-5">
            <button class="btn --circle" title="Очистить холст" @click="makeCanvasCleanModal">
              <mdicon name="cached" class="my-mdi" />
            </button>
            <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
              <div class="shure-content-modal">
                <div class="modal__text">
                  Вы уверены, что хотите очистить холст? <br />Все нарисованное будет утеряно!
                </div>
                <div class="modal__actions">
                  <div class="row">
                    <div class="col">
                      <button class="btn" @click="showModal = false">Нет</button>
                    </div>
                    <div class="col">
                      <button class="btn" @click="makeCanvasClean">Да</button>
                    </div>
                  </div>
                </div>
              </div>
            </vue-final-modal>
          </div>
          <div class="col px-5 ml-auto">
            <button class="btn --circle" title="Отменить последнее действие" @click="undoLastAction">
              <mdicon name="arrow-u-left-top" class="my-mdi" />
            </button>
          </div>
          <div class="col px-5">
            <button class="btn --circle" title="Вернуть последнее действие" @click="returnFromHistoryList">
              <mdicon name="arrow-u-right-top" class="my-mdi" />
            </button>
          </div>
        </div>
      </div>
      <div class="__box choose-color">
        <div class="scaling">
          <button class="btn --circle" title="Меньше" @click="doScaling(-1)">
            <mdicon name="minus" class="my-mdi" />
          </button>
          <span>{{ scaleInPrc }}%</span>
          <button class="btn --circle" title="Больше" @click="doScaling(1)">
            <mdicon name="plus" class="my-mdi" />
          </button>
        </div>
      </div>
      <div class="__box choose-color">
        <div class="row mx-5 align-center">
          <div class="col px-5">Выбрать цвет:</div>
          <div class="col px-5 ml-auto">
            <Popper placement="auto">
              <button class="btn --circle" :style="{ background: selectedColor }" title="Выбрать цвет">
                <mdicon name="format-color-fill" class="my-mdi" />
              </button>
              <template #content>
                <div class="color-picker">
                  <ColorPicker
                    color="#f80b"
                    default-format="rgb"
                    :visible-formats="['hex']"
                    alpha-channel="hide"
                    @color-change="chooseColor"
                  >
                    <template #copy-button>
                      <div title="Выбрать цвет" @click="updateDrawingColor">
                        <mdicon name="content-copy" class="my-mdi" />
                      </div>
                    </template>
                  </ColorPicker>
                </div>
              </template>
            </Popper>
          </div>
        </div>
      </div>

      <div class="__box color-pallete">
        <div class="__header">
          <div class="__title">Палитра</div>
          <button
            class="__btn __btn--add btn --circle --no-padding"
            title="Добавить в палитру цвет"
            @click="addColorInPollete"
          >
            <mdicon name="eyedropper-variant" class="my-mdi" />
          </button>
          <button class="__btn btn --circle --no-padding" title="Удалить из палитры увет" @click="removeColorInPollete">
            <mdicon name="trash-can-outline" class="my-mdi" />
          </button>
        </div>
        <div v-if="colorPallete.length" class="__body color-list">
          <div
            v-for="(item, i) in colorPallete"
            :key="i"
            :class="['color-item', item === selectedColor ? '_active' : '']"
            :style="{ background: item }"
            @click="chooseColorInPallete(item)"
          ></div>
        </div>
      </div>

      <div class="__box color-pallete canvas-pallete">
        <div class="__header">
          <div class="__title">Использованные цвета</div>
          <Popper placement="right">
            <button
              v-if="selectedColorForChange"
              class="btn --circle"
              :style="{ background: selectedColorForChange }"
              title="Заменить цвет"
            >
              <mdicon name="palette" class="my-mdi" />
            </button>
            <template #content>
              <div class="color-picker">
                <ColorPicker
                  color="#f80b"
                  default-format="rgb"
                  :visible-formats="['hex']"
                  alpha-channel="hide"
                  @color-change="chooseColorForReplace"
                >
                  <template #copy-button>
                    <div title="Заменить цвет" @click="replaceColorOnCanvas">
                      <mdicon name="content-copy" class="my-mdi" />
                    </div>
                  </template>
                </ColorPicker>
              </div>
            </template>
          </Popper>
        </div>
        <div v-if="colorsOnCanvas.length" class="__body color-list">
          <div
            v-for="(item, i) in colorsOnCanvas"
            :key="i"
            :class="['color-item', item === selectedColorForChange ? '_active' : '']"
            :style="{ background: item }"
            @click="chooseColorOnCanvas(item)"
          ></div>
        </div>
      </div>

      <div class="__box choose-size">
        <div class="__title">Выбрать размер</div>
        <select v-model="sizePaint">
          <option v-for="(val, name) in defaultSizesPaint" :key="name" :value="name" :disabled="name == 'custom'">
            {{ getTextSizePaint(val) }}
          </option>
        </select>
        <button @click="chooseSize" :disabled="sizePaint == 'custom'">OK</button>
      </div>
      <div class="__box choose-size">
        <div class="__title">Задать свой размер</div>
        <label for="">Ширина: <input v-model="customSizePaint.cols" type="text" /></label>
        <label for="">Высота: <input v-model="customSizePaint.rows" type="text" /></label>
        <button @click="chooseCustomSize">ОК</button>
        <div class="__title">Не может превышать 800x600</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Popper from "vue3-popper";
import { ColorPicker } from "vue-accessible-color-picker";

export default {
  components: {
    Popper,
    ColorPicker,
  },

  props: ["scaleInPrc", "colorsOnCanvas"],

  emits: ["doScaling", "replaceColorOnCanvas"],

  data() {
    return {
      sizePaint: "",
      customSizePaint: {
        cols: "",
        rows: "",
      },
      showModal: false,
      drawingColor: "",
      selectedColorForChange: "",
      selectedNewColorForChange: "",
    };
  },

  mounted() {
    this.sizePaint = this.selectedSizePaint.name;
  },

  computed: {
    ...mapGetters([
      "selectedColor",
      "colorPallete",
      "getSizePaint",
      "selectedSizePaint",
      "defaultSizesPaint",
      "cntHistoryAction",
    ]),

    ...mapGetters("header", ["isHeaderHidden"]),
  },

  methods: {
    updateDrawingColor() {
      this.$store.dispatch("setSelectedColor", this.drawingColor);
    },

    chooseColor(e) {
      this.drawingColor = e.cssColor;
    },

    chooseColorForReplace(e) {
      this.selectedNewColorForChange = e.cssColor;
    },

    replaceColorOnCanvas() {
      if (this.selectedColorForChange && this.selectedColorForChange !== this.selectedNewColorForChange) {
        this.$emit("replaceColorOnCanvas", {
          oldColor: this.selectedColorForChange,
          newColor: this.selectedNewColorForChange,
        });

        this.selectedColorForChange = this.selectedNewColorForChange;
      }
    },

    chooseColorOnCanvas(item) {
      this.selectedColorForChange = item;
    },

    addColorInPollete() {
      this.$store.dispatch("addColorInPallete", this.selectedColor);
    },

    removeColorInPollete() {
      this.$store.dispatch("removeColorInPallete", this.selectedColor);
    },

    chooseColorInPallete(color) {
      this.$store.dispatch("setSelectedColor", color);
    },

    chooseSize() {
      this.$store.dispatch("setSizePaint", this.sizePaint);
    },

    chooseCustomSize() {
      this.$store.dispatch("setCustomSizePaint", this.customSizePaint);
      this.sizePaint = "custom";
    },

    getTextSizePaint(value) {
      return typeof value === "string" ? value : `${value[0]}x${value[1]}`;
    },

    makeCanvasCleanModal() {
      this.showModal = true;
    },

    makeCanvasClean() {
      this.$store.dispatch("setCanvasClean", true);
      this.showModal = false;
    },

    undoLastAction() {
      this.$store.dispatch("undoLastAction", true);
    },

    returnFromHistoryList() {
      this.$store.dispatch("returnFromHistoryList", true);
    },

    doScaling(direction) {
      this.$emit("doScaling", direction);
    },
  },
};
</script>
<style lang="scss" scoped>
.left-sidebar {
  position: absolute;
  top: 110px;
  left: 0;
  bottom: 0;
  width: 200px;
  background: #fff;
  border-right: 3px solid #cbcbcb;
  color: #333;
  transition: top 0.4s;

  &._header-hidden {
    top: 0;
  }

  .__inner {
    padding: 10px 10px 75px;
    height: 100%;
    overflow: auto;
  }

  .__box {
    padding: 10px 0;
    border-bottom: 1px solid #cbcbcb;

    .__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}

.color-pallete {
  .__header {
    display: flex;
    justify-content: space-between;
  }

  .__btn {
    background: transparent;

    &--add {
      margin-left: auto;
      margin-right: 10px;
    }
  }
}

.color-picker {
  width: 300px;
  padding: 10px;
  border: 1px solid gray;
  background: white;
  border-radius: 15px;
}

.color-list {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  background: rgba(240, 240, 240, 1);
  border-radius: 5px;
}

.color-item {
  width: 15px;
  height: 15px;

  &._active {
    border: 2px solid rgba(46, 46, 46, 0.4);
  }
}

.choose-size {
  input {
    width: 100%;
  }
}

.scaling {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & > span {
    margin: 0 10px;
  }
}
</style>

<style lang="scss">
.material-design-icon__svg {
  display: block;
}

.inline-block {
  margin: 0 !important;
  border: none !important;
}

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  padding: 15px;
  background: #fff;
  border-radius: 10px;
}

.modal__actions {
  margin-top: 15px;
  .row {
    justify-content: flex-end;
  }
}
</style>
