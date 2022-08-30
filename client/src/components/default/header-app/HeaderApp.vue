<template>
  <div class="header-wrapper">
    <preheader-app />
    <div class="header">
      <div class="container --fluid">
        <div class="header__inner">
          <header-logo />
          <header-burger @open="openMenuToggle" />
          <header-nav-wrapper
            :is-open-menu="isOpenMenu"
            @close="openMenuToggle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreheaderApp from "@/components/default/header-app/PreheaderApp.vue";
import HeaderLogo from "@/components/default/header-app/HeaderLogo.vue";
import HeaderBurger from "@/components/default/header-app/HeaderBurger.vue";
import HeaderNavWrapper from "@/components/default/header-app/HeaderNavWrapper.vue";

export default {
  name: "HeaderApp",

  data() {
    return {
      isOpenMenu: false,
    };
  },

  components: {
    HeaderLogo,
    HeaderBurger,
    HeaderNavWrapper,
    PreheaderApp,
  },

  methods: {
    openMenuToggle() {
      this.isOpenMenu = !this.isOpenMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 5;
  background-color: $bg-header;
  color: #fff;

  a {
    color: #fff;
  }

  &__inner {
    display: flex;
    min-height: 60px;
    align-items: center;
    justify-content: space-between;
  }

  &__nav {
    ul {
      display: flex;
    }

    li {
      margin-right: 20px;
      display: inline-block;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
