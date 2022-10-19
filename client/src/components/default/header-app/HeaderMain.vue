<template>
  <div class="header-main">
    <div class="container --fluid">
      <div class="header-main__inner">
        <div class="header-main__left">
          <header-logo />
        </div>
        <div class="header-main__center">
          <header-nav :is-open-menu="isOpenMenu" @close="openMenuToggle" />
        </div>
        <div class="header-main__right">
          <header-burger @open="openMenuToggle" class="header-main__burger" />
          <header-hide-btn class="header-main__hide-btn" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogo from "@/components/default/header-app/HeaderLogo.vue";
import HeaderBurger from "@/components/default/header-app/HeaderBurger.vue";
import HeaderNav from "@/components/default/header-app/HeaderNav.vue";
import HeaderHideBtn from "@/components/default/header-app/HeaderHideBtn.vue";

export default {
  components: {
    HeaderLogo,
    HeaderBurger,
    HeaderNav,
    HeaderHideBtn,
  },

  data() {
    return {
      isOpenMenu: false,
    };
  },

  methods: {
    openMenuToggle() {
      this.isOpenMenu = !this.isOpenMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-main {
  display: block;

  &__inner {
    display: flex;
    min-height: $header-height;
    align-items: center;
    justify-content: space-between;
  }

  &__left,
  &__right {
    width: 25%;
  }

  &__center {
    flex-grow: 1;
  }

  &__hide-btn,
  &__burger {
    margin-left: auto;
  }
}
</style>
