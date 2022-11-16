<template>
  <div class="icon-btn" :class="{ active: isActive }">
    <button
      :class="[
        { bg_color: isBgColor },
        { round: isRound },
        { small: isSmall },
        { black: isBlack },
        { nested: isNested },
        { layer: isLayer },
      ]"
      class="icon-btn__inner"
      :title="title"
    >
      <slot class="icon-btn__slot"></slot>
      <div class="icon-btn__overlay"></div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    isBgColor: {
      type: Boolean,
      default: false,
    },
    isRound: {
      type: Boolean,
      default: false,
    },
    isBlack: {
      type: Boolean,
      default: false,
    },
    isNested: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isLayer: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-btn__overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
  border-radius: 10px;
  transition: background 0.5s;
  display: none;
}

.bg_color .icon-btn__overlay {
  display: block;
}

.icon-btn__inner :deep(svg) {
  z-index: 1;
  position: relative;
  fill: white;
  transition: fill 0.5s;
  height: 25px;
  width: 25px;
}

.black,
.blackWhite {
  &.icon-btn__inner :deep(svg) {
    fill: $black;
  }
}

.icon-btn__inner {
  transition: width 0.3s;
}

.icon-btn__inner.nested {
  width: 85px;
  background: linear-gradient(to right, $color1-gold-gradient, $color2-gold-gradient);
  display: flex;

  &.icon-btn__inner :deep(svg) {
    fill: white;
  }
}

.layer {
  cursor: auto;
  &.icon-btn__inner :deep(svg) {
    fill: white;
    opacity: 0.5;
    transition: opacity 0.35s fill 0.35s;
  }
}

.bg_color {
  background: $bg-icon-btn;
  position: relative;
  border-radius: 10px;
  padding: 5px;

  &.icon-btn__inner :deep(svg) {
    fill: $color-icon-btn;
  }
}

.round {
  padding: 8px;
  border-radius: 50%;
  transition: background 0.3s;
}

.small {
  &.icon-btn__inner :deep(svg) {
    height: 20px;
    width: 20px;
  }
}

.active .layer {
  &.icon-btn__inner :deep(svg) {
    fill: #fbc221;
    opacity: 1;
  }
}

.icon-btn:hover {
  .bg_color {
    .icon-btn__overlay {
      background: linear-gradient(to right, $color1-gold-gradient, $color2-gold-gradient);
    }

    &.icon-btn__inner :deep(svg) {
      fill: white;
    }
  }

  .round {
    background: linear-gradient(to right, $color1-gold-gradient, $color2-gold-gradient);

    &.icon-btn__inner :deep(svg) {
      fill: $bg-header;
    }
  }

  .black {
    background: none;

    &.icon-btn__inner :deep(svg) {
      fill: $bg-header;
    }
  }
}

.icon-btn.active {
  .bg_color {
    .icon-btn__overlay {
      background: linear-gradient(to right, $color1-gold-gradient, $color2-gold-gradient);
    }

    &.icon-btn__inner :deep(svg) {
      fill: white;
    }
  }

  .round {
    background: linear-gradient(to right, $color1-gold-gradient, $color2-gold-gradient);

    &.icon-btn__inner :deep(svg) {
      fill: $bg-header;
    }
  }

  .black {
    background: none;

    &.icon-btn__inner :deep(svg) {
      fill: $bg-header;
    }
  }

  .layer {
    &.icon-btn__inner :deep(svg) {
      opacity: 1;
    }
  }
}

.icon-btn.disabled:hover,
.icon-btn.disabled.active {
  .bg_color {
    .icon-btn__overlay {
      background: $bg-icon-btn;

      &.icon-btn__inner :deep(svg) {
        fill: $color-icon-btn;
      }
    }
  }

  .round {
    background: none;

    &.icon-btn__inner :deep(svg) {
      fill: white;
    }
  }
}
</style>
