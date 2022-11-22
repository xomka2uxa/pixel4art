<template>
  <div class="header-burger" @click="$emit('open')">
    <mdicon name="menu" class="header__icon" />
  </div>
</template>

<script>
export default {
  props: ["isHeaderCanClosed"],
};
</script>

<style lang="scss" scoped>
.header-burger {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  width: 24px;
  height: 24px;
  padding: 10px 10px;
  cursor: pointer;

  @media (min-width: 992px) {
    display: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
}
</style>
