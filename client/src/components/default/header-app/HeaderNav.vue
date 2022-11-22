<template>
  <div :class="['header-nav', isOpenMenu ? '_open' : '']">
    <menu-close @close="$emit('close')" />
    <header-menu @click="$emit('close')" />
  </div>
</template>

<script>
import MenuClose from "@/components/default/header-app/MenuClose.vue";
import HeaderMenu from "@/components/default/header-app/HeaderMenu.vue";

export default {
  components: {
    MenuClose,
    HeaderMenu,
  },

  props: ["isOpenMenu"],
};
</script>

<style lang="scss" scoped>
.header-nav {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  overflow: visible;

  &._open {
    display: flex;
    flex-direction: row;
    height: auto;
    width: auto;
    position: relative;
    top: auto;
    left: auto;
    background-color: transparent;
    padding: 0;
  }

  @include lg-down {
    display: none;
    overflow-y: scroll;

    &._open {
      flex-direction: column;
      justify-content: flex-start;
      height: 100%;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgb(0, 0, 0);
      padding: 5px 15px;
    }
  }
}
</style>
