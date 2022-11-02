<template>
  <div class="first-screen">
    <div class="first-screen__container">
      <div class="first-screen__inner">
        <div class="text__wrappper">
          <span class="pre-header">Рисуй и раскрашивай</span>
          <span class="header">В безграничном мире Pix4art</span>
          <p class="description">
            В нашем сервисе ты сможешь раскрашивать пиксельные арты, создавать В нашем сервисе ты сможешь раскрашивать
            пиксельные арты, создавать
          </p>
          <div class="btn__wrapper">
            <router-link :to="`/free-paint`" class="test-btn"> Попробовать </router-link>
            <!-- <a href="#" class="login-btn">Зарегистрироваться</a> -->
          </div>
        </div>
        <div class="image__wrapper">
          <img src="@/assets/img/astronaut.png" alt="Пиксельный космонавт" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstMainApp",
};
</script>

<style lang="scss" scoped>
.first-screen {
  background: rgb(18, 3, 47) url("@/assets/img/background-first.jpg") no-repeat;
  background-size: cover;
  min-height: 100vh;

  &__container {
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    padding: 130px 15px;
    padding-bottom: 40px;
    min-height: 100vh;

    @media (max-width: 1300px) {
      max-width: 100%;
    }

    // @media (min-width: 992px) {
    //   padding-bottom: 130px;
    // }
  }

  &__inner {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    @media (min-width: 992px) {
      flex-direction: row;
      min-height: 75vh;
    }

    .text__wrappper {
      color: white;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;

      @media (min-width: 992px) {
        width: 40%;
        display: block;
        margin-bottom: 0;
      }

      @media (min-width: 1200px) {
        width: 50%;
      }

      & span {
        display: block;
      }

      .pre-header {
        color: #bd00c6;
        text-transform: uppercase;
        font-size: 20px;
        font-weight: 800;
        font-family: AgencyFBCyrillic, Roboto, Arial, sans-serif;

        @media (min-width: 440px) {
          font-size: 28px;
        }

        @media (min-width: 1200px) {
          font-size: 48px;
        }
      }

      .header {
        margin-top: 10px;
        margin-bottom: 15px;
        color: #fff;
        text-transform: uppercase;
        font-size: 40px;
        text-shadow: 1px 1px 0 #fff;
        font-family: AgencyFBCyrillic, Roboto, Arial, sans-serif;
        text-align: center;

        @media (min-width: 440px) {
          font-size: 60px;
        }

        @media (min-width: 992px) {
          text-align: left;
        }

        @media (min-width: 1200px) {
          font-size: 94px;
        }
      }

      .description {
        font-family: Roboto Condensed, Roboto, Arial, sans-serif;
        color: #fff;
        font-size: 14px;
        margin-bottom: 40px;
        text-align: left;

        @media (min-width: 440px) {
          text-align: center;
        }
        @media (min-width: 992px) {
          text-align: left;
        }
      }
    }

    .image__wrapper {
      // display: none;

      @media (min-width: 576px) {
        display: block;
        position: static;
      }

      @media (min-width: 992px) {
        position: absolute;
        top: 0;
        right: 0;
      }

      img {
        height: 50vh;

        @media (min-width: 576px) {
          height: 75vh;
        }
      }
    }
  }
}
</style>
