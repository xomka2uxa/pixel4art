<template>
  <div class="menu-close" @click="$emit('close')">
    <mdicon name="close" class="menu-close__icon" />
  </div>
</template>

<style lang="scss" scoped>
.menu-close {
  display: none;
  @include lg-down {
    display: block;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  &__icon {
    :deep(svg) {
      fill: white;
      transition: fill 0.3s;
      width: 25px;
      height: 25px;
    }
  }

  &:hover {
    .menu-close__icon {
      :deep(svg) {
        fill: #fbc221;
      }
    }
  }
}
</style>
