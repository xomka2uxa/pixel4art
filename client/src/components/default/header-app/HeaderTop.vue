<template>
  <div class="header-top">
    <div class="container --fluid">
      <div class="header-top__inner">
        <mdicon name="clipboard-arrow-down-outline" class="header-top-mdi" />
        <mdicon name="camera-metering-center" class="header-top-mdi" />
        <mdicon name="cog" class="header-top-mdi" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header-top {
  background-color: $bg-preheader;
  min-height: 40px;

  &__inner {
    display: flex;
    min-height: 40px;
    align-items: center;
    justify-content: flex-end;

    .header-top-mdi:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
