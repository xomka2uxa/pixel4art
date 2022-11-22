<template>
  <div class="hide-btn">
    <div
      href="#"
      class="hide-btn__inner"
      v-if="isHeaderCanClosed"
      @click="$store.dispatch('header/toggleHeaderHidden')"
    >
      <transition name="fade" mode="out-in">
        <mdicon v-if="!isHeaderHidden" name="arrow-up" class="hide-btn__icon" />
        <mdicon v-else name="arrow-down" class="hide-btn__icon" />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("header", ["isHeaderCanClosed", "isHeaderHidden"]),
  },
};
</script>

<style lang="scss" scoped>
.hide-btn {
  position: absolute;
  bottom: -22px;
  border-radius: 2px;
  right: 0;
  padding: 5px;
  background-color: $bg-header;

  &__inner {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .hide-btn__icon {
      :deep(svg) {
        fill: white;
        transition: fill 0.3s;
        width: 13px;
        height: 13px;
      }
    }

    &:hover {
      .hide-btn__icon {
        :deep(svg) {
          fill: #fbc221;
        }
      }
    }
  }
}
</style>
