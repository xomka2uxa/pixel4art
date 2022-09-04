<template>
  <div class="left-sidebar">
    <div class="__inner">
      <div class="__box control-btn">
        <div class="row mx--5">
          <div class="col px-5">
            <button
              class="btn --circle"
              title="Очистить холст"
              @click="makeCanvasCleanModal"
            >
              <mdicon name="cached" class="my-mdi" />
            </button>
            <vue-final-modal
              v-model="showModal"
              classes="modal-container"
              content-class="modal-content"
            >
              <div class="shure-content-modal">
                <div class="modal__text">
                  Вы уверены, что хотите очистить холст? <br />Все нарисованное
                  будет утеряно!
                </div>
                <div class="modal__actions">
                  <div class="row">
                    <div class="col">
                      <button class="btn" @click="showModal = false">
                        Нет
                      </button>
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
            <button
              class="btn --circle"
              title="Отменить последнее действие"
              :disabled="cntHistoryAction >= 5"
              @click="undoLastAction"
            >
              <mdicon name="arrow-u-left-top" class="my-mdi" />
            </button>
          </div>
          <div class="col px-5">
            <button
              class="btn --circle"
              title="Вернуть последнее действие"
              :disabled="cntHistoryAction <= 0"
              @click="returnFromHistoryList"
            >
              <mdicon name="arrow-u-right-top" class="my-mdi" />
            </button>
          </div>
        </div>
      </div>
      <div class="__box choose-color">
        <div class="__header">
          Выбрать цвет:
          <Popper>
            <button
              class="btn --circle"
              :style="{ background: selectedColor }"
              title="Выбрать цвет"
            >
              <mdicon name="format-color-fill" class="my-mdi" />
            </button>
            <template #content>
              <div class="color-picker">
                <ColorPicker
                  color="#f80b"
                  default-format="rgb"
                  :visible-formats="['hex']"
                  alpha-channel="hide"
                  @color-change="updateColor"
                >
                  <template #copy-button>
                    <div>
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
                    </div>
                  </template>
                </ColorPicker>
              </div>
            </template>
          </Popper>
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
          <button
            class="__btn btn --circle --no-padding"
            title="Удалить из палитры увет"
            @click="removeColorInPollete"
          >
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

      <div class="__box choose-size">
        <div class="__title">Выбрать размер</div>
        <select v-model="sizePaint">
          <option
            v-for="(val, name) in defaultSizesPaint"
            :key="name"
            :value="name"
            :disabled="name == 'custom'"
          >
            {{ getTextSizePaint(val) }}
          </option>
        </select>
        <button @click="chooseSize" :disabled="sizePaint == 'custom'">
          OK
        </button>
      </div>
      <div class="__box choose-size">
        <div class="__title">Задать свой размер</div>
        <label for=""
          >Ширина: <input v-model="customSizePaint.cols" type="text"
        /></label>
        <label for=""
          >Высота: <input v-model="customSizePaint.rows" type="text"
        /></label>
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

  data() {
    return {
      sizePaint: "",
      customSizePaint: {
        cols: "",
        rows: "",
      },
      showModal: false,
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
  },

  methods: {
    updateColor(e) {
      this.$store.dispatch("setSelectedColor", e.cssColor);
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
      console.log(this.customSizePaint, this.sizePaint);
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
      this.$store.dispatch("setHistoryMode", true);
    },

    returnFromHistoryList() {
      this.$store.dispatch("returnFromHistoryList", true);
    },
  },
};
</script>
<style lang="scss" scoped>
.left-sidebar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  background: #fff;
  border-right: 3px solid #cbcbcb;
  color: #333;

  .__inner {
    padding: 75px 10px;
    margin-top: 60px;
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
