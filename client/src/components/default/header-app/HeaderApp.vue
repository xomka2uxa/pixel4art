<template>
  <div
    class="header"
    :class="{
      _transparent: isHeaderTransparent,
      _hidden: isHeaderHidden || (isHeaderHiddenMobile && !mq.xlPlus),
    }"
  >
    <div class="header__inner">
      <!-- <header-top /> -->
      <header-main />
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

// import HeaderTop from "@/components/default/header-app/HeaderTop.vue";
import HeaderMain from "@/components/default/header-app/HeaderMain.vue";
import HeaderOpen from "@/components/default/header-app/HeaderOpen.vue";

export default {
  inject: ["mq"],

  components: {
    // HeaderTop,
    HeaderMain,
    HeaderOpen,
  },

  computed: {
    ...mapGetters("header", ["isHeaderTransparent", "isHeaderHidden", "isHeaderHiddenMobile"]),
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
    height: $header-height;
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
    transform: translateY(-$header-height);
  }
}
</style>
