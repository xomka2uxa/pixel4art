<template>
  <div class="popup__wrapper">
    <div class="popup__up">
      <span class="popup__title">Замена цвета</span>
      <button class="btn__close" @click="$emit('close')">X</button>
    </div>
    <div class="popup__inner">
      <div class="current-size">
        <div class="inner__title">
          <span>Цвет для замены</span>
          {{ change }}
        </div>
        <div class="inner__content">
          <div v-if="pallete.length" class="__body color-list flex">
            <div
              v-for="(item, i) in pallete"
              :key="i"
              :class="['color-item', item === change ? '_active' : '']"
              :style="{ background: item }"
              @click="chooseColorPalette(item)"
            ></div>
          </div>
        </div>
      </div>
      <div class="current-size">
        <div class="inner__title">
          <span>Сравнение цветов:</span>
        </div>
        <div class="inner__content">
          <div class="feature__title">
            <div class="flex__center colors__wrapper">
              <div class="flex">
                <p class="color_name modal-container">Текущий цвет</p>
                <div class="colors__inner" :style="{ background: drawing }"></div>
              </div>
              <div class="flex">
                <p class="color_name modal-container">Новый цвет:</p>
                <div class="colors__inner" :style="{ background: drawing }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="current-size">
        <div class="inner__title">
          <span>Выбор нового цвета </span>
        </div>
        <div class="inner__content">
          <div class="color-picker">
            <ColorPicker
              color="#f80b"
              default-format="rgb"
              :visible-formats="['hex']"
              alpha-channel="hide"
              @color-change="chooseColor"
            >
            </ColorPicker>
          </div>
        </div>
      </div>
      <div class="buttons">
        <div class="col-50">
          <button @click="updateDrawingColor" class="test-btn btn-modal">OK</button>
        </div>
        <div class="col-50">
          <button class="test-btn btn-modal" @click="$emit('close')">ОТМЕНА</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ColorPicker } from "vue-accessible-color-picker";

export default {
  emits: {
    close: null,
    chooseColor: null,
    updateDrawingColor: null,
  },

  props: ["drawing", "selected", "pallete"],

  data() {
    return {
      change: "",
      selectedNewColorForChange: "",
    };
  },

  components: {
    ColorPicker,
  },

  computed: {
    ...mapGetters(["getSizePaint", "currentSizesPaint", "defaultSizesPaint"]),
  },

  methods: {
    updateDrawingColor() {
      this.$emit("updateDrawingColor");
      this.$emit("close");
    },

    chooseColor(e) {
      this.$emit("chooseColor", e);
    },

    chooseColorPalette(color) {
      this.change = color;
    },

    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.popup__wrapper {
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);
  width: 500px;
  position: relative;

  @include md-down {
    width: 90vw;
    height: 90vh;
  }
}

.popup__up {
  background: linear-gradient(to right, $color1-gold-gradient, $color2-gold-gradient);
  display: flex;
  align-items: center;
  padding: 5px 13px;
  justify-content: space-between;

  .popup__title {
    width: 100%;
    text-align: center;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: white;
  }

  .btn__close {
    color: #4f4f4f;
    font-weight: 600;
  }
}

.popup__inner {
  padding: 20px 13px 13px 13px;

  .feature__title {
    margin-right: 5px;
    text-transform: uppercase;
    margin-bottom: 10px;

    @include md-down {
      width: 40%;
    }

    @include sm-down {
      width: 50%;
    }

    @include xss-down {
      width: 100%;
    }
  }

  .current-size {
    border: 1px solid $light-grey;
    position: relative;
    margin-bottom: 25px;

    .inner__title {
      position: absolute;
      top: -7px;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      text-align: center;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 12px;
      text-transform: uppercase;
      color: $light-grey;
      font-weight: 500;

      & span {
        background: #fff;
        padding: 2px 6px;
      }
    }

    .inner__content {
      padding: 19px 12px 16px;
      display: flex;
      justify-content: center;
      color: $black;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-weight: 600;
      font-size: 14px;
    }
  }
}

.colors__wrapper {
  flex-direction: column;

  .colors__inner {
    width: 100px;
    height: 30px;
  }

  .color_name {
    margin-right: 10px;
  }
}

.color-item {
  width: 15px;
  height: 15px;

  &._active {
    border: 2px solid rgba(46, 46, 46, 0.4);
  }
}

.current-size {
  .feature__title {
    margin-bottom: 0;
    width: auto;
  }
}

.buttons {
  margin-bottom: 5px;
  display: flex;

  @include md-down {
    position: absolute;
    right: 13px;
    left: 13px;
    bottom: 18px;
    margin-bottom: 0;
  }

  @include sm-down {
    flex-direction: column;
  }

  .col-50 {
    @include sm-down {
      width: 100%;
    }
  }

  .col-50:first-child {
    margin-right: 10px;

    @include sm-down {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }

  .col-50:last-child {
    margin-left: 10px;

    @include sm-down {
      margin-left: 0;
    }
  }

  .btn-modal {
    background-color: $bg-header;
    width: 100%;
    border: none;
    margin-right: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    opacity: 1;
    transition: background-color 0.35s, opacity 0.35s;

    &:hover {
      border: none;
      background-color: $black;
    }

    &[disabled] {
      opacity: 0.5;

      &:hover {
        border: none;
        background-color: $bg-header;
        color: #fff;
      }
    }
  }
}
</style>
