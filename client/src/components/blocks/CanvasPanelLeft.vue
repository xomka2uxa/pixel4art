<template>
  <div class="left-sidebar" :class="[isHeaderHidden ? '_header-hidden' : '']">
    <div class="left-sidebar__inner">
      <div class="left-sidebar__box choose-color">
        <div class="flex-center">
          <div class="col col-layer">
            <div class="flex-center">
              <transition name="fade" mode="out-in">
                <icon-btn
                  v-if="isImage"
                  isLayer
                  isSmall
                  title="Слой с эскизом"
                  class="layer__btn"
                  :class="{ active: isImage }"
                >
                  <mdicon name="file-image" />
                </icon-btn>
                <icon-btn
                  v-else
                  isLayer
                  isSmall
                  class="layer__btn"
                  title="Слой с рисованием"
                  :class="{ active: !isImage }"
                >
                  <mdicon name="brush" />
                </icon-btn>
              </transition>
            </div>
            <div class="tumbler__wrapper" @click="SwitchTumbler">
              <div class="tumbler" :class="{ image: isImage }"></div>
            </div>
          </div>
          <div class="col">
            <Popper placement="right-start">
              <icon-btn isBgColor title="Загрузить картинку" @click="ShowModalImage">
                <mdicon name="file-image-plus" />
              </icon-btn>
              <template #content="{ close }">
                <modal-image @close="close" />
              </template>
            </Popper>
          </div>
          <div class="col">
            <div v-if="isImage" class="overlay"></div>
            <Popper placement="right-start">
              <icon-btn isBgColor title="Покрасить фон" @click="ShowModalFon">
                <mdicon name="format-color-fill" />
              </icon-btn>
              <template #content="{ close }">
                <modal-fon
                  @update-drawing-color="updateDrawingColor"
                  @choose-color-fon="chooseColorFon"
                  @close="close"
                />
              </template>
              <template #copy-button>
                <div title="Заменить цвет" @click="replaceColorOnCanvas">
                  <mdicon name="content-copy" class="my-mdi" />
                </div>
              </template>
            </Popper>
          </div>
          <div class="col">
            <div v-if="isImage" class="overlay"></div>
            <icon-btn isBgColor title="Ластик" @click="Eraser">
              <mdicon name="eraser" />
            </icon-btn>
          </div>
          <div class="col">
            <div v-if="isImage" class="overlay"></div>
            <Popper placement="right-start">
              <icon-btn isBgColor title="Цвет рисования" @click="ShowModalPouring">
                <mdicon name="brush" />
              </icon-btn>
              <template #content="{ close }">
                <modal-pouring
                  @update-drawing-color="updateDrawingColor"
                  @choose-color="chooseColor"
                  @close="close"
                  :drawing="drawingColor"
                  :selected="selectedColor"
                />
              </template>
              <template #copy-button>
                <div title="Заменить цвет" @click="replaceColorOnCanvas">
                  <mdicon name="content-copy" class="my-mdi" />
                </div>
              </template>
            </Popper>
          </div>
          <div class="col">
            <div v-if="!colorsOnCanvas.length || isImage" class="overlay"></div>
            <Popper placement="right-start">
              <icon-btn isBgColor title="Замена цвета" @click="ShowModalChange">
                <mdicon name="invert-colors" />
              </icon-btn>
              <template #content="{ close }">
                <modal-change
                  @update-drawing-color="updateDrawingColor"
                  @choose-color="chooseColor"
                  @close="close"
                  :pallete="colorsOnCanvas"
                  :drawing="drawingColor"
                  :selected="selectedColor"
                />
              </template>
              <template #copy-button>
                <div title="Заменить цвет" @click="replaceColorOnCanvas">
                  <mdicon name="content-copy" class="my-mdi" />
                </div>
              </template>
            </Popper>
          </div>
          <div class="col">
            <div v-if="isImage" class="overlay"></div>
            <icon-btn isBgColor :isNested="isNested" title="Палитра" @click="ShowInnerPalette" class="palet__wrapper">
              <mdicon name="palette" />
            </icon-btn>
            <div class="palet__inner flex" :class="{ palette__visible: isPalette }">
              <mdicon title="Добавить цвет" name="plus-thick" class="icon__palette" />
              <mdicon title="Удалить цвет" name="minus-thick" class="icon__palette" />
              <mdicon title="Заменить цвет" name="invert-colors" class="icon__palette" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Popper from "vue3-popper";
import IconBtn from "@/components/ui/IconBtn.vue";
import ModalPouring from "@/components/ui/ModalPouring.vue";
import ModalFon from "@/components/ui/ModalFon.vue";
import ModalChange from "@/components/ui/ModalChange.vue";
import ModalImage from "@/components/ui/ModalImage.vue";

export default {
  inject: ["mq"],

  components: {
    Popper,
    IconBtn,
    ModalPouring,
    ModalFon,
    ModalImage,
    ModalChange,
  },

  props: ["colorsOnCanvas"],

  emits: ["replaceColorOnCanvas"],

  data() {
    return {
      isShowModalPouring: false,
      isShowModalFon: false,
      isShowModalImage: false,
      isShowModalChange: false,
      drawingColor: "",
      isImage: false,
      isPalette: false,
      isNested: false,
      // selectedColorForChange: "",
      selectedNewColorForChange: "",
    };
  },

  computed: {
    ...mapGetters(["selectedColor", "colorPallete"]),

    ...mapGetters("header", ["isHeaderHidden"]),
  },

  methods: {
    ShowInnerPalette() {
      this.isPalette = !this.isPalette;
      this.isNested = !this.isNested;
    },

    ShowModalChange() {
      this.isShowModalChange = true;
    },

    ShowModalPouring() {
      this.isShowModalPouring = true;
    },

    ShowModalImage() {
      this.isShowModalImage = true;
    },

    ShowModalFon() {
      this.isShowModalFon = true;
    },

    Eraser() {
      this.drawingColor = `rgb(255, 255, 255)`;
      this.$store.dispatch("setSelectedColor", this.drawingColor);
    },

    updateDrawingColor() {
      this.$store.dispatch("setSelectedColor", this.drawingColor);
      this.isShowModalPouring = false;
    },

    chooseColorFon(e) {
      let arr = e.cssColor.slice(e.cssColor.indexOf("(") + 1, e.cssColor.indexOf(")")).split(" ");
      arr.forEach((el, i) => {
        arr[i] = Math.floor(el);
      });
      this.drawingColor = `rgb(${arr.join(", ")})`;
      console.log(this.drawingColor);
    },

    chooseColor(e) {
      let arr = e.cssColor.slice(e.cssColor.indexOf("(") + 1, e.cssColor.indexOf(")")).split(" ");
      arr.forEach((el, i) => {
        arr[i] = Math.floor(el);
      });
      this.drawingColor = `rgb(${arr.join(", ")})`;
    },

    SwitchTumbler() {
      this.isImage = !this.isImage;
    },
  },
};
</script>

<style lang="scss" scoped>
.left-sidebar {
  position: absolute;
  top: $header-height;
  left: 0;
  bottom: 0;
  width: 80px;
  background: #fff;
  color: #333;
  transition: top 0.4s;

  &._header-hidden {
    top: 0;
  }

  @include xl-down {
    top: 0;
  }

  &__inner {
    padding: 10px 10px 75px;
    height: 100%;
    overflow: visible;
  }

  &__box {
    padding: 10px 0;

    .__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}

.col:not(:last-child) {
  margin-bottom: 15px;
}

.col {
  position: relative;
}

.col-layer {
  padding: 0;
  justify-content: center;
  padding-bottom: 15px;
  border-bottom: 1px solid $dark-grey;
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

.palet__wrapper {
  position: relative;
}

.palet__inner {
  position: absolute;
  display: none;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 0 10px 10px 0;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 5px 7px 5px;
  left: 44px;
  top: 0;
  z-index: 3;

  &.palette__visible {
    display: flex;
    opacity: 1;
  }

  :deep(svg) {
    height: 17px;
    width: 17px;
    cursor: pointer;
    fill: $color-icon-btn;
    transition: fill 0.3s;
    margin-right: 2px;
  }
}

.icon__palette:hover,
.icon__palette:active {
  :deep(svg) {
    fill: white;
  }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: rgba(255, 255, 255, 0.4);
  cursor: not-allowed;
}

.layer__btn {
  display: flex;
  justify-content: center;
}

.layer__btn.last {
  justify-content: flex-end;
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

.modal__actions {
  margin-top: 15px;
  .row {
    justify-content: flex-end;
  }
}
</style>
