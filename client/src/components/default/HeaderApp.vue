<template>
  <div class="header">
    <div class="container">
      <div class="header__inner">
        <div class="logo">
          <a href="index.html">
            <img src="" alt="PIX4ART">
            PIX4ARTSSS
          </a>
        </div>
        <div class="header__nav">
          <ul>
            <li><router-link to="/free-paint">Свободное рисование</router-link></li>
            <li><a href="#">Блог</a></li>
            <li><a href="contacts.html">Контакты</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderApp',
};
</script>

<style lang="scss" scoped>
  .header {
    background-color: beige;

    &__inner {
      display: flex;
      min-height: 60px;
      align-items: center;
      justify-content: space-between;
    }

    &__nav {

      ul {
        display: flex;
      }

      li {
        margin-right: 20px;
        display: inline-block;

        &:last-child {
          margin-right: 0;
        }
      }

      .active {
        a {
          color: rgb(62, 62, 62);
          background-color: rgb(165, 172, 109);
        }
      }
    }
  }
</style>
