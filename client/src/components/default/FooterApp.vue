<template>
  <div class="footer">
      <div class="container">
        <div class="logo">
          <a href="index.html">
            <img src="" alt="PIX4ART">
            PIX4ART
          </a>
        </div>
        <div class="copyright">
          <span>Pix4art@copyright 2022</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'FooterApp',
};
</script>

<style lang="scss" scoped>
.footer {
    background-color: black;
    color: aliceblue;
    padding: 15px 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 60px;
    display: flex;
    z-index: 2;

    .container {
      display: flex;
      justify-content: space-between;
    }
}
</style>
