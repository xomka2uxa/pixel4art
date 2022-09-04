<template>
  <div class="preheader">
    <div class="container --fluid">
      <div class="preheader__inner">
        <mdicon name="clipboard-arrow-down-outline" class="preheader-mdi" />
        <mdicon name="camera-metering-center" class="preheader-mdi" />
        <mdicon name="cog" class="preheader-mdi" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreheaderApp",
};
</script>

<style lang="scss" scoped>
.preheader {
  background-color: $bg-preheader;
  min-height: 40px;

  &__inner {
    display: flex;
    min-height: 40px;
    align-items: center;
    justify-content: flex-end;

    .preheader-mdi:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
