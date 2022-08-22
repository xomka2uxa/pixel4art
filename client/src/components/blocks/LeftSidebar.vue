<template>
  <div class="left-sidebar">
    <div class="inner">
      <div class="choose-color">
        <Popper>
          <button>Выбрать цвет</button>
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
                  <div @click="chooseColor">
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

        <div
          class="colors-selected"
          :style="{ background: selectedColor }"
        ></div>
      </div>

      <hr />
      <div class="color-pallete">
        <div class="__header">
          <div class="__title">Палитра</div>
          <button class="__add" @click="addColorInPollete">Добавить</button>
        </div>
        <div class="color-list">
          <div
            v-for="(item, i) in colorPallete"
            :key="i"
            :class="['color-item', item === selectedColor ? '_active' : '']"
            :style="{ background: item }"
            @click="chooseColorInPallete(item)"
          ></div>
        </div>
      </div>

      <hr />
      <div class="choose-size">
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

      <hr />
      <div class="choose-size">
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
    ]),
  },

  methods: {
    updateColor(e) {
      this.$store.dispatch("setSelectedColor", e.cssColor);
    },

    chooseColor() {},
    addColorInPollete() {
      this.$store.dispatch("addColorInPallete", this.selectedColor);
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
  border-right: 1px solid gray;
  background: rgb(237, 237, 237);
  padding: 75px 10px;
}

.choose-color {
  display: flex;
  justify-content: space-between;
}

.color-pallete {
  .__header {
    display: flex;
    justify-content: space-between;
  }
}

.color-picker {
  width: 300px;
  padding: 10px;
  border: 1px solid gray;
  background: white;
  border-radius: 15px;
}

.colors-selected {
  width: 15px;
  height: 15px;
}

.color-list {
  display: flex;
  flex-wrap: wrap;
}

.color-item {
  width: 15px;
  height: 15px;

  &._active {
    border: 3px solid rgba(0, 0, 0, 0.4);
  }
}
</style>
