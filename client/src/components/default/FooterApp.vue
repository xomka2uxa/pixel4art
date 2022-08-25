<template>
  <div class="footer">
    <div class="container">
      <div class="logo">
        <a href="index.html"> PIX4ART </a>
      </div>
      <div class="copyright">
        <span>Pix4art@copyright 2022</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterApp",
};
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(179 79 148);
  color: #fff;
  padding: 15px 0;
  z-index: 5;
  display: none;

  a {
    color: #fff;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
