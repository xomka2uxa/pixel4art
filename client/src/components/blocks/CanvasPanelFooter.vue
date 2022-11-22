<template>
  <div class="canvas-panel">
    <div class="canvas-panel__inner">
      <div class="canvas-panel__box">
        <icon-btn isRound isSmall title="Изменить размер холста (Alt+CTRL+C)" @click="CanvasShowModal">
          <mdicon name="resize" />
        </icon-btn>
        <vue-final-modal
          v-model="showModal"
          classes="modal-container --right"
          :lock-scroll="false"
          content-class="modal-content"
        >
          <modal-resize @close="showModal = false" />
        </vue-final-modal>
      </div>
      <div class="canvas-panel__box cancel flex">
        <icon-btn
          isRound
          isSmall
          title="Отменить последнее действие"
          @click="undoLastAction"
          class="cancel__btn"
          :class="{ disabled: historyList.length == 0 || prevDisabled }"
        >
          <mdicon name="arrow-u-left-top" />
        </icon-btn>
        <icon-btn
          isRound
          isSmall
          class="return__btn"
          title="Вернуть последнее действие"
          @click="returnFromHistoryList"
          :class="{ disabled: historyList.length == 0 || nextDisabled }"
        >
          <mdicon name="arrow-u-right-top" />
        </icon-btn>
      </div>
      <div class="canvas-panel__box">
        <icon-btn isRound isSmall title="Очистить холст" @click="ShowModalDelete">
          <mdicon name="trash-can-outline" />
        </icon-btn>
        <vue-final-modal v-model="showModalDelete" classes="modal-container" content-class="modal-content">
          <modal-delete @close="showModalDelete = false" />
        </vue-final-modal>
      </div>
      <div class="canvas-panel__box zoom flex">
        <icon-btn
          isRound
          isSmall
          title="Уменьшить масштаб"
          @click="doScaling(-1)"
          class="outzoom__btn"
          :class="{ disabled: scaleInPrc <= 5 }"
        >
          <mdicon name="magnify-minus-outline" />
        </icon-btn>
        <span class="zoom__text">{{ scaleInPrc }}%</span>
        <icon-btn
          isRound
          isSmall
          class="zoom__btn"
          title="Увеличить масштаб"
          @click="doScaling(1)"
          :class="{ disabled: scaleInPrc >= 200 }"
        >
          <mdicon name="magnify-plus-outline" />
        </icon-btn>
      </div>
      <div class="canvas-panel__box zoom flex">
        <icon-btn
          isRound
          isSmall
          title="Подвинуть холст вниз"
          @mousedown="doMovingStart('y', -1)"
          @mouseup="doMovingEnd"
          :class="{ disabled: scaleInPrc <= 5 }"
        >
          <mdicon name="chevron-down" />
        </icon-btn>
        <icon-btn
          isRound
          isSmall
          title="Подвинуть холст вверх"
          @mousedown="doMovingStart('y', 1)"
          @mouseup="doMovingEnd"
          :class="{ disabled: scaleInPrc >= 200 }"
        >
          <mdicon name="chevron-up" />
        </icon-btn>
        <icon-btn
          isRound
          isSmall
          title="Подвинуть холст влево"
          @mousedown="doMovingStart('x', 1)"
          @mouseup="doMovingEnd"
          :class="{ disabled: scaleInPrc <= 5 }"
        >
          <mdicon name="chevron-left" />
        </icon-btn>
        <icon-btn
          isRound
          isSmall
          title="Подвинуть холст вправо"
          @mousedown="doMovingStart('x', -1)"
          @mouseup="doMovingEnd"
          :class="{ disabled: scaleInPrc >= 200 }"
        >
          <mdicon name="chevron-right" />
        </icon-btn>
      </div>
      <div class="canvas-panel__box zoom flex">
        <icon-btn isLayer isSmall title="Слой с эскизом" class="layer__btn" :class="{ active: isImage }">
          <mdicon name="file-image" />
        </icon-btn>
        <div class="tumbler__wrapper" @click="SwitchTumbler">
          <div class="tumbler" :class="{ image: isImage }"></div>
        </div>
        <icon-btn isLayer isSmall class="layer__btn" title="Слой с рисованием" :class="{ active: !isImage }">
          <mdicon name="brush" />
        </icon-btn>
      </div>
    </div>
    <!-- <div class="canvas-panel__inner">
      <div class="canvas-panel__box info">
        <icon-btn isRound isSmall title="Быстрое обучение">
          <mdicon name="information-outline" />
        </icon-btn>
        <vue-final-modal classes="modal-container" content-class="modal-content">
          <modal-resize />
        </vue-final-modal>
      </div>
    </div> -->
    <div class="canvas-panel__inner">
      <div class="canvas-panel__box info" v-click-outside="ActiveNested">
        <Popper placement="top">
          <icon-btn
            isRound
            isSmall
            :is-active-nest="isActiveNest"
            title="Настройки"
            @click="isActiveNest = !isActiveNest"
          >
            <mdicon name="cog" class="my-mdi" />
          </icon-btn>
          <template #content>
            <inner-setting />
          </template>
        </Popper>
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
      </div>
    </div>
  </div>
</template>

<script>
import IconBtn from "@/components/ui/IconBtn.vue";
import ModalResize from "@/components/ui/ModalResize.vue";
import InnerSetting from "@/components/ui/InnerSetting.vue";
import ModalDelete from "@/components/ui/ModalDelete.vue";
import { mapGetters } from "vuex";
import Popper from "vue3-popper";
import vClickOutside from "click-outside-vue3";

export default {
  components: {
    IconBtn,
    ModalResize,
    ModalDelete,
    Popper,
    InnerSetting,
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  props: ["historyList", "scaleInPrc", "x", "y", "width", "height", "cheight", "cwidth"],

  emits: ["doScaling", "doMoving"],

  data() {
    return {
      showModal: false,
      showModalDelete: false,
      showModalInfo: false,
      doMovingFunc: null,
      isMoveDisable: false,
      isActiveNest: false,
    };
  },

  computed: {
    prevDisabled() {
      let user = this.historyList.find((item) => item.isHistory == false);
      return user == undefined ? true : false;
    },
    nextDisabled() {
      let user = this.historyList.find((item) => item.isHistory == true);
      return user == undefined ? true : false;
    },

    ...mapGetters(["isImage"]),
  },

  methods: {
    ShowModalDelete() {
      this.showModalDelete = true;
    },

    CanvasShowModal() {
      this.showModal = true;
    },

    InfoShowModal() {
      this.showModalInfo = true;
    },

    ActiveNested() {
      this.isActiveNest = false;
    },

    undoLastAction() {
      this.$store.dispatch("undoLastAction", true);
      console.log(
        this.historyList[0].isHistory,
        this.historyList[1].isHistory,
        this.historyList[2].isHistory,
        this.historyList[3].isHistory,
        this.historyList[4].isHistory
      );
    },

    returnFromHistoryList() {
      this.$store.dispatch("returnFromHistoryList", true);
    },

    makeCanvasClean() {
      this.$store.dispatch("setCanvasClean", true);
      this.showModal = false;
    },

    doScaling(direction) {
      this.$emit("doScaling", direction);
    },

    doMoving(axis, direction) {
      this.$emit("doMoving", axis, direction);
      console.log(axis, direction);
    },

    doMovingStart(axis, direction) {
      if (!this.isMoveDisable) {
        this.$emit("doMoving", {
          axis: axis,
          direction: direction,
        });
        this.doMovingFunc = setInterval(
          () =>
            this.$emit("doMoving", {
              axis: axis,
              direction: direction,
            }),
          150
        );
      }
    },

    doMovingEnd() {
      clearInterval(this.doMovingFunc);
    },

    SwitchTumbler() {
      this.$store.dispatch("SwitchTumbler", !this.isImage);
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas-panel {
  position: absolute;
  display: flex;
  height: 50px;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $bg-header;
  color: #fff;
  padding: 7px 0;
  z-index: 4;
  box-shadow: 0 -4px 7px 0 rgba(0, 0, 0, 0.35);

  @include sm-down {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }

  &__inner {
    display: flex;

    .canvas-panel__box {
      padding: 0 20px;
      border-right: 1px solid #74578a;
      position: relative;

      &:last-child {
        border-right: 1px solid transparent;
      }

      &.cancel {
        .cancel__btn {
          margin-right: 10px;
        }

        .cancel__btn,
        .return__btn {
          transition: opacity 0.3s;
          &.disabled {
            opacity: 0.6;
          }
        }
      }

      &.zoom {
        align-items: center;

        .outzoom__btn,
        .zoom__text {
          margin-right: 10px;
        }

        .outzoom__btn,
        .zoom__btn {
          transition: opacity 0.3s;
          &.disabled {
            opacity: 0.6;
          }
        }
      }

      &.info {
        border-left: 1px solid #74578a;
      }
    }
  }
}
</style>
