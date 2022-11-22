<template>
  <div
    class="header"
    :class="{
      _transparent: isHeaderTransparent,
      _hidden: isHeaderHidden,
    }"
  >
    <div class="header__inner">
      <div class="header-main main">
        <div class="container container_fluid">
          <div class="main__inner">
            <div class="main__left">
              <header-logo />
            </div>
            <div class="main__center">
              <header-nav :is-open-menu="isOpenMenu" @close="closeMenuToggle" />
            </div>
            <div class="main__right">
              <header-burger @open="openMenuToggle" class="main__burger" :isHeaderCanClosed="isHeaderCanClosed" />
              <header-hide-btn v-if="isOpenMenu == false && isHeaderCanClosed" class="main__hide-btn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderLogo from "@/components/default/header-app/HeaderLogo.vue";
import HeaderBurger from "@/components/default/header-app/HeaderBurger.vue";
import HeaderNav from "@/components/default/header-app/HeaderNav.vue";
import HeaderHideBtn from "@/components/default/header-app/HeaderHideBtn.vue";

export default {
  inject: ["mq"],

  components: {
    HeaderLogo,
    HeaderBurger,
    HeaderNav,
    HeaderHideBtn,
  },

  computed: {
    ...mapGetters("header", ["isHeaderTransparent", "isHeaderHidden", "isHeaderCanClosed"]),
  },

  data() {
    return {
      isOpenMenu: false,
    };
  },

  methods: {
    openMenuToggle() {
      this.isOpenMenu = !this.isOpenMenu;
      document.body.classList.add("_locked");
    },

    closeMenuToggle() {
      this.isOpenMenu = !this.isOpenMenu;
      document.body.classList.remove("_locked");
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

  &._transparent {
    .header__inner {
      background-color: transparent;
    }
  }

  &._hidden {
    .header__inner {
      transform: translateY(-$header-height + 10px);
    }
  }

  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: $bg-header;
    transition: transform 0.4s;
    z-index: 2;
    height: $header-height;

    .main {
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
        display: flex;

        @include md-down {
          width: 50%;
        }
      }

      &__right {
        overflow: visible;
        justify-content: end;
      }

      &__center {
        flex-grow: 1;
      }
    }
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
</style>
