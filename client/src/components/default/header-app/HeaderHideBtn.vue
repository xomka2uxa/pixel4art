<template>
  <div href="#" class="header-hide-btn" v-if="isHeaderCanClosed" @click="$store.dispatch('header/toggleHeaderHidden')">
    <mdicon name="arrow-up-thick" class="preheader-soc" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("header", ["isHeaderCanClosed"]),
  },
};
</script>

<style lang="scss" scoped>
.header-hide-btn {
  position: relative;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.25s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 980px) {
    background-color: rgba(255, 255, 255, 0.1);

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
