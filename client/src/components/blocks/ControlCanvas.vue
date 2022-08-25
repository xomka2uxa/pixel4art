<template>
  <div class="control-canvas">
    <div class="btn _circle" title="Очистить холст">
      <clear-canvas />
    </div>
  </div>
</template>

<script>
import ClearCanvas from "vue-material-design-icons/Cached.vue";

export default {
  components: {
    ClearCanvas,
  },
};
</script>
<style lang="scss" scoped>
.control-canvas {
  position: absolute;
  top: 70px;
  right: 10px;
  padding: 5px;
  border-radius: 20px;
}

.btn {
  outline: none;
  border: none;
  background: #fff;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &._circle {
    border-radius: 50%;
    padding: 5px;
  }

  &._no-padding {
    padding: 0;
  }
}
</style>
