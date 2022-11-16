<template #content>
  <div class="popup__wrapper">
    <div class="popup__up">
      <span class="popup__title">Работа с картинкой</span>
      <button class="btn__close" @click="$emit('close')">X</button>
    </div>
    <div class="popup__inner">
      <div class="current-size">
        <div class="inner__title">
          <span>Текущий размер</span>
        </div>
        <div class="inner__content">
          <div class="feature__title">
            <p>{{ currentSizesPaint[0] }} x {{ currentSizesPaint[1] }}</p>
          </div>
        </div>
      </div>
      <div class="new-size">
        <div class="inner__title">
          <span>Новый размер</span>
        </div>
        <div class="inner__content__grid">
          <div class="choose-size__wrapper">
            <p class="feature__title">Выберите размер:</p>
            <select v-model="sizePaint" @change="clickSize()" @keyup.enter="clickSize()">
              <option v-for="(val, name) in defaultSizesPaint" :key="name" :value="val">
                {{ getTextSizePaint(val) }}
              </option>
            </select>
            <p v-if="isSmallerSize" class="attention">
              Выбранный Вами размер меньше текущего, часть изображения будет не видна на холсте
            </p>
          </div>
          <div class="custom__size">
            <div v-if="CustomDisable" class="overlay"></div>
            <div class="choose-size__wrapper">
              <p class="feature__title">Задать свой размер:</p>
              <div class="flex">
                <div class="col-30">
                  <label for="">Ширина:</label>
                  <label for="">Высота:</label>
                </div>
                <div class="col-70">
                  <input v-model="customSizePaint.cols" type="text" @input="clickCustomCol()" />
                  <input v-model="customSizePaint.rows" type="text" @input="clickCustomRow()" />
                  <div class="attention" v-if="isWrongCol">Введите число</div>
                  <div
                    class="attention"
                    v-if="
                      isWrongRow == true && isSmallerCustomCol == false && isBiggerCol == false && isWrongCol == false
                    "
                  >
                    Введите число
                  </div>
                  <div class="attention" v-if="isSmallerCustomCol">
                    Выбранный Вами размер меньше текущего, часть изображения будет не видна на холсте
                  </div>
                  <div
                    class="attention"
                    v-if="
                      isSmallerCustomRow == true &&
                      isWrongCol == false &&
                      isBiggerCol == false &&
                      isSmallerCustomCol == false
                    "
                  >
                    Выбранный Вами размер меньше текущего, часть изображения будет не видна на холсте
                  </div>
                  <div class="attention" v-if="isBiggerCol">Вы превысили максимально допустимые размеры картинки</div>
                  <div
                    class="attention"
                    v-if="
                      isBiggerRow == true && isWrongCol == false && isSmallerCustomCol == false && isBiggerCol == false
                    "
                  >
                    Вы превысили максимально допустимые картинки холста
                  </div>
                  <div class="attention __grey">Максимальные размеры 800 на 600</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="current-size">
        <div class="inner__title">
          <span>Текущее расположение</span>
        </div>
        <div class="inner__content">
          <div class="flex">
            <div class="col-30">
              <div class="feature__title">X:</div>
              <div class="feature__title">Y:</div>
            </div>
            <div class="col-70">
              <div class="feature__title value">50</div>
              <div class="feature__title value">230</div>
            </div>
          </div>
        </div>
      </div>
      <div class="new-size">
        <div class="inner__title">
          <span>Новое расположение</span>
        </div>
        <div class="inner__content__grid">
          <div class="position__wrapper">
            <p class="feature__title">Расположение:</p>
            <div class="position__inner">
              <div
                data-id="top-left"
                class="position__value"
                :class="{ active__position: position === 'top-left' }"
                @click="clickPosition('top-left')"
              >
                <div class="position__value__inner">-></div>
              </div>
              <div
                data-id="top-center"
                class="position__value"
                @click="clickPosition('top-center')"
                :class="{ active__position: position === 'top-center' }"
              >
                <div class="position__value__inner">-></div>
              </div>
              <div
                data-id="top-right"
                class="position__value"
                @click="clickPosition('top-right')"
                :class="{ active__position: position === 'top-right' }"
              >
                <div class="position__value__inner">-></div>
              </div>
              <div
                data-id="center-left"
                class="position__value"
                @click="clickPosition('center-left')"
                :class="{ active__position: position === 'center-left' }"
              >
                <div class="position__value__inner">-></div>
              </div>
              <div
                data-id="center-center"
                class="position__value"
                @click="clickPosition('center-center')"
                :class="{ active__position: position === 'center-center' }"
              >
                <div class="position__value__inner round"></div>
              </div>
              <div
                data-id="center-right"
                class="position__value"
                @click="clickPosition('center-right')"
                :class="{ active__position: position === 'center-right' }"
              >
                <div class="position__value__inner">-></div>
              </div>
              <div
                data-id="bottom-left"
                class="position__value"
                @click="clickPosition('bottom-left')"
                :class="{ active__position: position === 'bottom-left' }"
              >
                <div class="position__value__inner">-></div>
              </div>
              <div
                data-id="bottom-center"
                class="position__value"
                @click="clickPosition('bottom-center')"
                :class="{ active__position: position == 'bottom-center' }"
              >
                <div class="position__value__inner">-></div>
              </div>
              <div
                data-id="bottom-right"
                class="position__value"
                @click="clickPosition('bottom-right')"
                :class="{ active__position: position === 'bottom-right' }"
              >
                <div class="position__value__inner">-></div>
              </div>
            </div>
          </div>
          <div class="custom__size">
            <div class="choose-size__wrapper">
              <p class="feature__title">Задать своё положение:</p>
              <div class="flex">
                <div class="labels">
                  <label for="">X:</label>
                  <label for="">Y:</label>
                </div>
                <div class="inputs">
                  <input v-model="customSizePaint.cols" type="text" @input="clickCustomCol()" />
                  <input v-model="customSizePaint.rows" type="text" @input="clickCustomRow()" />
                  <div class="attention" v-if="isWrongCol">Введите число</div>
                  <div
                    class="attention"
                    v-if="
                      isWrongRow == true && isSmallerCustomCol == false && isBiggerCol == false && isWrongCol == false
                    "
                  >
                    Введите число
                  </div>
                  <div class="attention" v-if="isSmallerCustomCol">
                    Выбранный Вами размер меньше текущего, часть изображения будет не видна на холсте
                  </div>
                  <div
                    class="attention"
                    v-if="
                      isSmallerCustomRow == true &&
                      isWrongCol == false &&
                      isBiggerCol == false &&
                      isSmallerCustomCol == false
                    "
                  >
                    Выбранный Вами размер меньше текущего, часть изображения будет не видна на холсте
                  </div>
                  <div class="attention" v-if="isBiggerCol">Вы превысили максимально допустимые размеры картинки</div>
                  <div
                    class="attention"
                    v-if="
                      isBiggerRow == true && isWrongCol == false && isSmallerCustomCol == false && isBiggerCol == false
                    "
                  >
                    Вы превысили максимально допустимые картинки холста
                  </div>
                  <div class="attention __grey">Максимальные размеры 800 на 600</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="current-size">
        <div class="inner__title">
          <span>Прозрачность</span>
        </div>
        <div class="inner__content __opacity">
          <div>
            <vue-slider v-model="value" class="slider__opacity" />
            <div class="flex">
              <div class="col-30">
                <label for="">Непрозрачность:</label>
              </div>
              <div class="col-70">
                <input v-model="value" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <div class="col-50">
          <button
            @click="chooseSize"
            class="test-btn btn-modal"
            :disabled="isWrongCol || isBiggerCol || isWrongRow || isBiggerRow"
          >
            OK
          </button>
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
import { reactive, toRefs } from "vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  emits: {
    close: null,
  },

  components: {
    VueSlider,
  },

  setup() {
    const data = reactive({ value: 0 });
    return toRefs(data);
  },

  data() {
    return {
      sizePaint: "",
      value: 100,
      isSmallerSize: false,
      isSmallerCustomCol: false,
      isSmallerCustomRow: false,
      isSmallerCustomSize: false,
      isWrongCol: false,
      isWrongRow: false,
      isBiggerCol: false,
      isBiggerRow: false,
      position: "center-center",
      myAttribute: "",
      CustomDisable: true,
      customSizePaint: {
        cols: "",
        rows: "",
      },
    };
  },

  mounted() {
    this.sizePaint = this.currentSizesPaint;
  },

  computed: {
    ...mapGetters(["getSizePaint", "currentSizesPaint", "defaultSizesPaint"]),
  },

  methods: {
    chooseSize() {
      this.$emit("close");
      this.isSmallerSize = false;
      this.isSmallerCustomCol = false;
      this.isSmallerCustomRow = false;
      this.isSmallerCustomSize = false;
      this.isWrongCol = false;
      this.isWrongRow = false;
      this.isBiggerCol = false;
      this.isBiggerRow = false;
      if (this.sizePaint == "Свои размеры") {
        this.$store.dispatch("setCustomSizePaint", this.customSizePaint);
      } else {
        this.$store.dispatch("setSizePaint", this.sizePaint);
      }
    },

    clickSize() {
      if (this.sizePaint[0] < this.currentSizesPaint[0] || this.sizePaint[1] < this.currentSizesPaint[1]) {
        this.isSmallerSize = true;
      } else {
        this.isSmallerSize = false;
      }
      if (this.sizePaint == "Свои размеры") {
        this.CustomDisable = false;
      } else {
        this.CustomDisable = true;
      }
    },

    closeModal() {
      this.$emit("close");
    },

    clickCustomCol() {
      if (isNaN(this.customSizePaint.cols) || this.customSizePaint.cols.length == 0) {
        this.isWrongCol = true;
        this.isBiggerCol = false;
        this.isSmallerCustomCol = false;
      } else {
        this.isWrongCol = false;
        if (+this.customSizePaint.cols < +this.currentSizesPaint[0]) {
          this.isSmallerCustomCol = true;
          this.isWrongCol = false;
          this.isBiggerCol = false;
        } else {
          this.isSmallerCustomCol = false;
          if (+this.customSizePaint.cols > "800") {
            this.isBiggerCol = true;
            this.isSmallerCustomCol = false;
            this.isWrongCol = false;
          } else {
            this.isBiggerCol = false;
          }
        }
      }
    },

    clickCustomRow() {
      if (isNaN(this.customSizePaint.rows) || this.customSizePaint.cols.length == 0) {
        this.isWrongRow = true;
        this.isBiggerRow = false;
        this.isSmallerCustomRow = false;
      } else {
        this.isWrongRow = false;
        if (+this.customSizePaint.rows < +this.currentSizesPaint[1]) {
          this.isSmallerCustomRow = true;
          this.isWrongRow = false;
          this.isBiggerRow = false;
        } else {
          this.isSmallerCustomRow = false;
          if (+this.customSizePaint.rows > "600") {
            this.isBiggerRow = true;
            this.isSmallerCustomRow = false;
            this.isWrongRow = false;
          } else {
            this.isBiggerRow = false;
          }
        }
      }
    },

    chooseCustomSize() {
      this.$store.dispatch("setCustomSizePaint", this.customSizePaint);
      this.sizePaint = "Свои размеры";
    },

    getTextSizePaint(value) {
      return typeof value === "string" ? value : `${value[0]}x${value[1]}`;
    },

    clickPosition(value) {
      this.position = value;
      // this.myAttribute = event.target.getAttribute("id");
      // this.position = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.popup__wrapper {
  background-color: #fff;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);
  width: 500px;
  position: relative;
  height: 100%;
  overflow-y: auto;

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

    &.value {
      margin-left: 5px;
      font-weight: 500;
    }
  }

  .current-size,
  .new-size {
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

      &.__opacity {
        display: block;
      }

      .feature__value {
        margin-left: 5px;
      }
    }
  }
}

.current-size {
  .feature__title {
    margin-bottom: 0;
    width: auto;
  }
}

.new-size {
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.8);
    z-index: 2;
  }

  .inner__content__grid {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr 1fr;
    padding: 19px 12px 16px;
    color: $black;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 600;
    font-size: 14px;

    @include md-down {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
    }
  }

  .choose-size__wrapper {
    margin-bottom: 20px;
    grid-row: 1;

    @include md-down {
      display: flex;
      grid-row: 1;
    }

    @include xss-down {
      flex-direction: column;
    }

    .col-30 {
      margin-right: 5px;

      label:first-child {
        margin-bottom: 10px;
      }
    }

    .col-70 {
      margin-left: 5px;

      input:first-child {
        margin-bottom: 10px;
      }
    }

    .attention {
      margin-top: 10px;
      color: #fc5454;
      font-weight: 300;
      font-size: 10px;

      @include md-down {
        display: flex;
        align-items: center;
      }

      &.__grey {
        color: $dark-grey;
        font-size: 12px;

        @include md-down {
          margin-left: 0;
        }
      }
    }
  }
}

.position__wrapper {
  grid-row: 1;

  @include md-down {
    display: flex;
    grid-row: 3;
  }

  @include xss-down {
    flex-direction: column;
  }

  .position__inner {
    display: flex;
    flex-wrap: wrap;
    width: 81px;
    height: 81px;
    background-color: #e8e8e8;
    border: 1px solid $dark-grey;

    .position__value {
      width: 33.3%;
      height: 33.3%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $ultralight-grey;
      cursor: pointer;
      transition: background-color 0.35s;

      &:nth-child(3n),
      &:nth-child(3n + 2) {
        border-left: 1px solid $dark-grey;
      }

      &:nth-child(-n + 3),
      &:nth-child(-n + 6) {
        border-bottom: 1px solid $dark-grey;
      }

      &:hover,
      &.active__position {
        background-color: $light-grey;

        .position__value__inner.round {
          background-color: $ultradark-grey;
        }

        .position__value__inner {
          color: $ultradark-grey;
        }
      }

      .position__value__inner {
        color: $dark-grey;
        transition: color 0.35s;

        &.round {
          border-radius: 50%;
          width: 10px;
          height: 10px;
          background-color: $dark-grey;
          transition: background-color 0.35s;
        }
      }
    }
  }
}

.custom__size {
  position: relative;
  margin-right: 10px;
  grid-row: 1 / 3;

  @include md-down {
    margin-right: 0;
    grid-row: 2;
  }

  .flex {
    width: 100%;
  }

  .choose-size__wrapper {
    flex-wrap: wrap;
  }

  .feature__title {
    width: 100%;
  }

  .col-30 {
    @include md-down {
      width: 40%;
    }
  }

  .col-70 {
    @include md-down {
      width: 60%;
    }
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

select {
  -webkit-appearance: button;
  cursor: pointer;
  -moz-appearance: button;
  -webkit-padding-end: 20px;
  -moz-padding-end: 20px;
  -webkit-padding-start: 2px;
  -moz-padding-start: 2px;
  background-color: $ultralight-grey;
  // background-image: url("@/assets/img/chevron-down.svg"), -webkit-linear-gradient(top, #e5e5e5, #f4f4f4);
  // background-image: url("@/assets/img/chevron-down.svg"), -moz-linear-gradient(top, #e5e5e5, #f4f4f4);
  // background-image: url("@/assets/img/chevron-down.svg"), -ms-linear-gradient(top, #e5e5e5, #f4f4f4);
  // background-image: url("@/assets/img/chevron-down.svg"), -o-linear-gradient(top, #e5e5e5, #f4f4f4);
  // background-image: url("@/assets/img/chevron-down.svg"), linear-gradient(to bottom, #e5e5e5, #f4f4f4);
  background-position: center right;
  background-repeat: no-repeat;
  border: 1px solid $dark-grey;
  border-radius: 2px;
  color: $black;
  font-size: inherit;
  margin: 0;
  overflow: hidden;
  padding-top: 2px;
  padding-bottom: 2px;
  text-overflow: ellipsis;
  white-space: nowrap;

  @include sm-down {
    width: 140px;
  }
}

label {
  display: block;
}

input {
  width: 100%;
  background-color: $ultralight-grey;
  border: 1px solid $dark-grey;
  border-radius: 2px;
  color: $black;
  -webkit-padding-end: 20px;
  -moz-padding-end: 20px;
  -webkit-padding-start: 5px;
  -moz-padding-start: 5px;
  padding-top: 2px;
  padding-bottom: 2px;

  @include md-down {
    width: 140px;
    display: block;
  }
}

.__opacity input {
  width: auto;
}

[data-id="top-left"] .position__value__inner {
  transform: rotate(-135deg);
}

[data-id="top-center"] .position__value__inner {
  transform: rotate(-90deg);
}

[data-id="top-right"] .position__value__inner {
  transform: rotate(-45deg);
}

[data-id="center-left"] .position__value__inner {
  transform: rotate(-180deg);
}

[data-id="bottom-left"] .position__value__inner {
  transform: rotate(135deg);
}

[data-id="bottom-center"] .position__value__inner {
  transform: rotate(90deg);
}

[data-id="bottom-right"] .position__value__inner {
  transform: rotate(45deg);
}

.labels {
  margin-right: 10px;
  label:first-child {
    margin-bottom: 12px;
  }
}

.inputs {
  input:first-child {
    margin-bottom: 10px;
  }
}

.slider__opacity {
  margin-bottom: 10px;
}
</style>
