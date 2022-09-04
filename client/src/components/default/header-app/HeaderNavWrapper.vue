<template>
  <div :class="['header-nav-wrapper', isOpenMenu ? 'open' : '']">
    <menu-close @close="$emit('close')" />
    <header-nav />
    <header-socials @set-header-toggle="$emit('SetHeaderToggle')" />
  </div>
</template>

<script>
import MenuClose from "@/components/default/header-app/MenuClose.vue";
import HeaderNav from "@/components/default/header-app/HeaderNav.vue";
import HeaderSocials from "@/components/default/header-app/HeaderSocials.vue";

export default {
  components: {
    MenuClose,
    HeaderSocials,
    HeaderNav,
  },

  props: ["isOpenMenu"],
};
</script>

<style lang="scss" scoped>
.header-nav-wrapper {
  display: none;
  overflow-y: scroll;

  &.open {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0);
    padding: 5px 15px;
  }

  @media (min-width: 992px) {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    overflow: visible;

    &.open {
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
  }
}
</style>
