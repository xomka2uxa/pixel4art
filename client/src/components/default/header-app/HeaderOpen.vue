<template>
  <transition name="fade">
    <button v-if="isHeaderHidden" class="header-open">
      <mdicon name="arrow-down-thick" class="preheader-soc" />
    </button>
  </transition>
</template>

<script>
export default {
  props: ["isHeaderHidden"],
};
</script>

<style lang="scss" scoped>
.header-open {
  position: fixed;
  top: 20px;
  right: 110px;
  z-index: 1;
  transition: 0.3s;
  opacity: 1;
}
</style>
