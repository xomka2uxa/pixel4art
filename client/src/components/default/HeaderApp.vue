<template>
  <div class="header">
    <div class="container --fluid">
      <div class="header__inner">
        <div class="logo">
          <a href="index.html"> PIX4ART </a>
        </div>
        <div class="header__nav">
          <ul>
            <li>
              <router-link to="/free-paint">Свободное рисование</router-link>
            </li>
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
  name: "HeaderApp",
};
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgb(179 79 148);
  z-index: 5;
  color: #fff;

  a {
    color: #fff;
  }

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
  }
}
</style>
