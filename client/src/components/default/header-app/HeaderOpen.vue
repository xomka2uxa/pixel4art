<template>
  <div class="headerOpen-wrapper">
    <a href="#" class="login_wrapper" @click="hiddenHeaderToggle">
      <mdicon name="arrow-down-thick" class="preheader-soc" />
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    hiddenHeaderToggle() {
      this.$emit("SetHeaderToggle");
    },
  },
};
</script>

export default {
<style lang="scss" scoped>
.headerOpen-wrapper {
  position: fixed;
  top: 20px;
  right: 110px;
  z-index: 1;
  opacity: 100%;
  transition: 0.3s;
}

a {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
}

.login_wrapper {
  margin-right: 10px;

  @media (min-width: 992px) {
    margin-right: 0;
  }
}
</style>
