<template>
  <div class="header-burger" @click="$emit('open')">
    <span></span>
  </div>
</template>

<style lang="scss" scoped>
.header-burger {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  width: 30px;
  height: 30px;
  padding: 10px 10px;
  cursor: pointer;

  @media (min-width: 992px) {
    display: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
  }

  span {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 2px;
    vertical-align: bottom;
    background: #fff;
  }

  span:before,
  span:after {
    content: "";
    position: absolute;
    left: 0;
    width: 30px;
    height: 2px;
    background: #fff;
  }

  span:before {
    top: -10px;
  }

  span:after {
    top: 10px;
  }
}
</style>
