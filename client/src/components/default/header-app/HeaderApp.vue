<template>
  <div
    class="header"
    :class="{
      _transparent: isHeaderTransparent,
      _hidden: isHeaderHidden || (isHeaderHiddenMobile && !mq.xlPlus),
    }"
  >
    <div class="header__inner">
      <header-top />
      <div class="header-bottom">
        <div class="container --fluid">
          <div class="header-bottom__inner">
            <header-logo />
            <header-burger @open="openMenuToggle" />
            <header-nav-wrapper :is-open-menu="isOpenMenu" @close="openMenuToggle" />
            <header-socials />
          </div>
        </div>
      </div>
    </div>
    <header-open
      class="__open-btn"
      :is-header-hidden="isHeaderHidden && mq.xlPlus"
      @click="$store.dispatch('header/toggleHeaderHidden')"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import HeaderTop from "@/components/default/header-app/HeaderTop.vue";
import HeaderLogo from "@/components/default/header-app/HeaderLogo.vue";
import HeaderBurger from "@/components/default/header-app/HeaderBurger.vue";
import HeaderNavWrapper from "@/components/default/header-app/HeaderNavWrapper.vue";
import HeaderOpen from "@/components/default/header-app/HeaderOpen.vue";
import HeaderSocials from "@/components/default/header-app/HeaderSocials.vue";

export default {
  inject: ["mq"],

  data() {
    return {
      isOpenMenu: false,
    };
  },

  components: {
    HeaderLogo,
    HeaderBurger,
    HeaderNavWrapper,
    HeaderTop,
    HeaderOpen,
    HeaderSocials,
  },

  computed: {
    ...mapGetters("header", ["isHeaderTransparent", "isHeaderHidden", "isHeaderHiddenMobile"]),
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
  top: 0;
  left: 0;
  right: 0;
  color: #fff;
  z-index: 5;

  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: $bg-header;
    transition: transform 0.4s;
    z-index: 2;
  }

  a {
    color: #fff;
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

._transparent {
  .header__inner {
    background-color: transparent;
  }
}

._hidden {
  .header__inner {
    transform: translateY(-115px);
  }
}

.header-bottom {
  display: block;

  &__inner {
    display: flex;
    min-height: 60px;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
