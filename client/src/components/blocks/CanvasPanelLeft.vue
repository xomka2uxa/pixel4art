<template>
  <div class="left-sidebar" :class="[isHeaderHidden ? '_header-hidden' : '']">
    <div class="left-sidebar__inner">
      <div class="left-sidebar__box choose-color">
        <div class="flex-center">
          <div class="col">
            <Popper placement="right-start">
              <icon-btn isBgColor title="Покрасить фон" @click="ShowModalPouring">
                <mdicon name="brush" />
              </icon-btn>
              <template #content="{ close }">
                <modal-pouring @update-drawing-color="updateDrawingColor" @choose-color="chooseColor" @close="close" />
              </template>
              <template #copy-button>
                <div title="Заменить цвет" @click="replaceColorOnCanvas">
                  <mdicon name="content-copy" class="my-mdi" />
                </div>
              </template>
            </Popper>
          </div>
          <div class="col">
            <Popper placement="right-start">
              <icon-btn isBgColor title="Покрасить фон" @click="ShowModalPouring">
                <mdicon name="brush" />
              </icon-btn>
              <template #content="{ close }">
                <modal-pouring @update-drawing-color="updateDrawingColor" @choose-color="chooseColor" @close="close" />
              </template>
              <template #copy-button>
                <div title="Заменить цвет" @click="replaceColorOnCanvas">
                  <mdicon name="content-copy" class="my-mdi" />
                </div>
              </template>
            </Popper>
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

export default {
  inject: ["mq"],

  components: {
    Popper,
    IconBtn,
    ModalPouring,
  },

  props: ["colorsOnCanvas"],

  emits: ["replaceColorOnCanvas"],

  data() {
    return {
      isShowModalPouring: false,
      drawingColor: "",
      selectedColorForChange: "",
      selectedNewColorForChange: "",
    };
  },

  computed: {
    ...mapGetters(["selectedColor", "colorPallete"]),

    ...mapGetters("header", ["isHeaderHidden"]),
  },

  methods: {
    ShowModalPouring() {
      this.isShowModalPouring = true;
    },

    updateDrawingColor() {
      this.$store.dispatch("setSelectedColor", this.drawingColor);
      this.isShowModalPouring = false;
    },

    chooseColor(e) {
      console.log(e);
      let arr = e.cssColor.slice(e.cssColor.indexOf("(") + 1, e.cssColor.indexOf(")")).split(" ");
      arr.forEach((el, i) => {
        arr[i] = Math.floor(el);
      });
      this.drawingColor = `rgb(${arr.join(", ")})`;
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
    overflow: auto;
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

// .modal-content {
//   padding: 15px;
//   background: #fff;
//   border-radius: 10px;
// }

.modal__actions {
  margin-top: 15px;
  .row {
    justify-content: flex-end;
  }
}
</style>
