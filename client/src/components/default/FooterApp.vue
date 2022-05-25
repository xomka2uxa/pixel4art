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

    .container{
    display: flex;
    justify-content: space-between;
    }
}
</style>
