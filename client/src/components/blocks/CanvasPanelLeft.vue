<template>
  <div class="left-sidebar" :class="[isHeaderHidden ? '_header-hidden' : '']">
    <div class="left-sidebar__inner">
      <div class="left-sidebar__box choose-color">
        <div class="flex-center">
          <!-- <div class="col col-layer">
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
          </div> -->
          <div class="col">
            <div v-if="!isImage" class="overlay"></div>
            <icon-btn isBgColor title="Загрузить картинку" @click="ShowModalImage">
              <mdicon name="image-plus" />
            </icon-btn>
            <vue-final-modal
              v-model="isShowModalImage"
              classes="modal-container --right"
              :lock-scroll="false"
              content-class="modal-content"
            >
              <modal-image @close="isShowModalImage = false" />
              ldfff
            </vue-final-modal>
          </div>
          <div class="col" v-click-outside="HideInnerImageWork">
            <div v-if="!isImage" class="overlay"></div>
            <icon-btn isBgColor :isNested="isNestedImage" title="Работа с картинкой" @click="ShowInnerImageWork">
              <mdicon name="image-edit" />
            </icon-btn>
            <vue-final-modal
              v-model="isShowModalImageWork"
              classes="modal-container --right"
              :lock-scroll="false"
              content-class="modal-content"
            >
              <modal-image-work @close="isShowModalImageWork = false" />
            </vue-final-modal>
            <div class="palet__inner flex" :class="{ palette__visible: isImageWork }">
              <mdicon title="Удалить" name="minus-thick" class="icon__palette" @click="ShowModalDeleteImage" />
              <vue-final-modal v-model="showModalDeleteImage" classes="modal-container" content-class="modal-content">
                <modal-delete-image @close="showModalDeleteImage = false" />
              </vue-final-modal>
              <mdicon title="Редактировать" name="pencil" class="icon__palette" @click="ShowModalImageWork" />
            </div>
          </div>
          <div class="col">
            <div v-if="isImage" class="overlay"></div>
            <icon-btn isBgColor title="Покрасить фон" @click="ShowModalFon">
              <mdicon name="format-color-fill" />
            </icon-btn>
            <vue-final-modal
              v-model="isShowModalFon"
              classes="modal-container --right"
              :lock-scroll="false"
              content-class="modal-content"
            >
              <modal-fon
                @update-drawing-color="updateDrawingColor"
                @choose-color-fon="chooseColorFon"
                @close="isShowModalFon = false"
              />
            </vue-final-modal>
          </div>
          <div class="col">
            <div v-if="isImage" class="overlay"></div>
            <icon-btn isBgColor title="Ластик" @click="Eraser">
              <mdicon name="eraser" />
            </icon-btn>
          </div>
          <div class="col">
            <div v-if="isImage" class="overlay"></div>
            <icon-btn isBgColor title="Цвет рисования" @click="ShowModalPouring">
              <mdicon name="brush" />
            </icon-btn>
            <vue-final-modal
              v-model="isShowModalPouring"
              classes="modal-container --right"
              :lock-scroll="false"
              content-class="modal-content"
            >
              <modal-pouring
                @update-drawing-color="updateDrawingColor"
                @choose-color="chooseColor"
                @close="isShowModalPouring = false"
                :drawing="drawingColor"
                :selected="selectedColor"
              />
            </vue-final-modal>
          </div>
          <div class="col">
            <div v-if="!colorsOnCanvas.length || isImage" class="overlay"></div>
            <icon-btn isBgColor title="Замена цвета" @click="ShowModalChange">
              <mdicon name="invert-colors" />
            </icon-btn>
            <vue-final-modal
              v-if="isShowModalChange"
              v-model="isShowModalChange"
              classes="modal-container --right"
              :lock-scroll="false"
              content-class="modal-content"
            >
              <modal-change
                @replace-color-on-canvas="replaceColorOnCanvas"
                @close="isShowModalChange = false"
                :pallete="colorsOnCanvas"
                :drawing="drawingColor"
              />
            </vue-final-modal>
          </div>
          <div class="col" v-click-outside="HideInnerPalette">
            <div v-if="isImage" class="overlay"></div>
            <icon-btn isBgColor :isNested="isNested" title="Палитра" @click="ShowInnerPalette" class="palet__wrapper">
              <mdicon name="palette" />
            </icon-btn>
            <vue-final-modal
              v-model="isShowModalAddPalette"
              classes="modal-container --right"
              :lock-scroll="false"
              content-class="modal-content"
            >
              <modal-add-palette
                @update-drawing-color="addColorToPalette"
                @choose-color="chooseColor"
                @close="isShowModalAddPalette = false"
                :drawing="drawingColor"
                :selected="selectedColor"
              />
            </vue-final-modal>
            <div class="palet__inner flex" :class="{ palette__visible: isPalette }">
              <mdicon
                title="Добавить цвет"
                name="plus-thick"
                class="icon__palette"
                @click="isShowModalAddPalette = true"
              />
              <mdicon
                title="Удалить цвет"
                name="minus-thick"
                class="icon__palette"
                @click="removeColorInPollete"
                :disabled="!selectedPaletteForChange"
              />
            </div>
            <div class="flex-palette">
              <div
                v-for="(item, i) in colorPallete"
                :key="i"
                :class="['color-item _palette', 'col-50', item === selectedPaletteForChange ? '_active' : '']"
                :style="{ background: item }"
                @click="changeColorPalette(item)"
              ></div>
              <div class="color-item _palette col-50 void" @click="addColorPalette">
                <mdicon name="plus-thick" class="icon-palette" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import IconBtn from "@/components/ui/IconBtn.vue";
import ModalPouring from "@/components/ui/ModalPouring.vue";
import ModalFon from "@/components/ui/ModalFon.vue";
import ModalChange from "@/components/ui/ModalChange.vue";
import ModalImage from "@/components/ui/ModalImage.vue";
import ModalImageWork from "@/components/ui/ModalImageWork.vue";
import ModalAddPalette from "@/components/ui/ModalAddPalette.vue";
import ModalDeleteImage from "@/components/ui/ModalDeleteImage.vue";
import vClickOutside from "click-outside-vue3";

export default {
  inject: ["mq"],

  components: {
    IconBtn,
    ModalPouring,
    ModalFon,
    ModalImage,
    ModalChange,
    ModalAddPalette,
    ModalDeleteImage,
    ModalImageWork,
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  props: ["colorsOnCanvas"],

  emits: ["replaceColorOnCanvas"],

  data() {
    return {
      isShowModalPouring: false,
      isShowModalAddPalette: false,
      isShowModalFon: false,
      isShowModalImage: false,
      isShowModalImageWork: false,
      isShowModalChange: false,
      showModalDeleteImage: false,
      drawingColor: "",
      isPalette: false,
      isNested: false,
      isNestedImage: false,
      isImageWork: false,
      selectedColorForChange: "",
      selectedPaletteForChange: "",
    };
  },

  computed: {
    ...mapGetters(["selectedColor", "colorPallete", "isImage"]),

    ...mapGetters("header", ["isHeaderHidden"]),
  },

  methods: {
    ShowModalDeleteImage() {
      this.showModalDeleteImage = true;
    },

    addColorPalette() {
      this.$store.dispatch("addColorInPallete", this.selectedColor);
      this.selectedPaletteForChange = this.selectedColor;
      console.log(this.selectedPaletteForChange, this.selectedColor);
    },

    changeColorPalette(item) {
      this.selectedPaletteForChange = item;
      this.$store.dispatch("setSelectedColor", this.selectedPaletteForChange);
    },

    addColorToPalette() {
      this.$store.dispatch("addColorInPallete", this.drawingColor);
      this.$store.dispatch("setSelectedColor", this.drawingColor);
      this.selectedPaletteForChange = this.drawingColor;
    },

    removeColorInPollete() {
      if (this.selectedPaletteForChange) {
        this.$store.dispatch("removeColorInPallete", this.selectedColor);
        this.selectedPaletteForChange = "";
      }
    },

    chooseColorInPallete(color) {
      this.$store.dispatch("setSelectedColor", color);
    },

    ShowInnerPalette() {
      this.isPalette = !this.isPalette;
      this.isNested = !this.isNested;
    },

    HideInnerPalette() {
      this.isPalette = false;
      this.isNested = false;
    },

    HideInnerImageWork() {
      this.isImageWork = false;
      this.isNestedImage = false;
    },

    ShowInnerImageWork() {
      this.isImageWork = !this.isImageWork;
      this.isNestedImage = !this.isNestedImage;
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

    ShowModalImageWork() {
      this.isShowModalImageWork = true;
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
      this.selectedPaletteForChange = "";
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

    replaceColorOnCanvas({ newColor, oldColor }) {
      this.$emit("replaceColorOnCanvas", {
        oldColor,
        newColor,
      });
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

.color-item._palette {
  &._active {
    border: 2px solid rgb(189, 0, 198);
  }
  &.void._active {
    border: none;
  }
}

.palet__wrapper {
  position: relative;
  margin-bottom: 10px;
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
    transition: fill 0.3s, opacity 0.3s;
    margin-right: 5px;
  }

  [disabled="true"] {
    :deep(svg) {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
}

.icon__palette:hover,
.icon__palette:active {
  :deep(svg) {
    fill: white;
  }

  &[disabled="true"] {
    :deep(svg) {
      fill: $color-icon-btn;
    }
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

.flex-palette {
  display: flex;
  position: relative;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-right: 5px;
}

.color-item {
  margin-bottom: 5px;
  border-radius: 2px;
}

.void {
  background: $bg-icon-btn;
  position: relative;
  transition: background 0.3s;
}

.icon-palette {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  :deep(svg) {
    width: 12px;
    height: 12px;
  }
}

.void:hover,
.void:active {
  background: $color-icon-btn;
  :deep(svg) {
    fill: white;
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

.modal__actions {
  margin-top: 15px;
  .row {
    justify-content: flex-end;
  }
}
</style>
