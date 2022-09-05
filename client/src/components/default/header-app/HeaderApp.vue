<template>
  <div class="header" :class="[isHeaderTransparent ? 'transparent' : '', isHeaderHidden ? 'hide' : '']">
    <div class="__inner">
      <preheader-app />
      <div class="header-bottom">
        <div class="container --fluid">
          <div class="header__inner">
            <header-logo />
            <header-burger @open="openMenuToggle" />
            <header-nav-wrapper
              :is-open-menu="isOpenMenu"
              @close="openMenuToggle"
              @set-header-toggle="swopeHeaderToggle"
            />
          </div>
        </div>
      </div>
    </div>
    <header-open class="__open-btn" :is-header-hidden="isHeaderHidden" @click="swopeHeaderToggle" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import PreheaderApp from "@/components/default/header-app/PreheaderApp.vue";
import HeaderLogo from "@/components/default/header-app/HeaderLogo.vue";
import HeaderBurger from "@/components/default/header-app/HeaderBurger.vue";
import HeaderNavWrapper from "@/components/default/header-app/HeaderNavWrapper.vue";
import HeaderOpen from "@/components/default/header-app/HeaderOpen.vue";

export default {
  data() {
    return {
      isOpenMenu: false,
      isHeaderHidden: false,
    };
  },

  components: {
    HeaderLogo,
    HeaderBurger,
    HeaderNavWrapper,
    PreheaderApp,
    HeaderOpen,
  },

  computed: {
    ...mapGetters(["isHeaderTransparent"]),
  },

  methods: {
    openMenuToggle() {
      this.isOpenMenu = !this.isOpenMenu;
    },

    swopeHeaderToggle() {
      this.isHeaderHidden = !this.isHeaderHidden;
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

  .__inner {
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

.transparent {
  .__inner {
    background-color: transparent;
  }
}

.hide {
  .__inner {
    transform: translateY(-115px);
  }
}

.header-bottom {
  display: block;
}
</style>
