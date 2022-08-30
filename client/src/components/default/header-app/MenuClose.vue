<template>
  <div class="menu-close" @click="$emit('close')">
    <a class="menu-close__icon" href="#"></a>
  </div>
</template>

<style lang="scss" scoped>
.menu-close {
  display: block;
  position: absolute;
  top: 0;
  right: 10px;

  @media (min-width: 992px) {
    display: none;
  }
  &__icon {
    &:after {
      content: "×";
      color: rgb(140, 137, 137);
      font-size: 40px;
      font-family: arial, sans-serif;
    }
  }
}
</style>
