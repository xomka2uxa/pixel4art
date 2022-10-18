<template>
  <div class="pop__wrapper" v-if="open">
    <span>Я тут!!!</span>
    <button v-on:click="popUpOpen">Закрыть</button>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: ["open"],
  methods: {
    popUpOpen() {
      this.$emit("clickBtn");
    },
  },
};
</script>

<style lang="scss" scoped>
.pop__wrapper {
  position: absolute;
  top: 50%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 2;
  background-color: white;
  color: #000;
  padding: 20px;
  width: 100px;
  height: 100px;
}
</style>
