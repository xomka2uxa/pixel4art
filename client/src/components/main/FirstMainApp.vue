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
            <a href="#" class="test-btn">Попробовать</a>
            <a href="#" class="login-btn">Зарегистрироваться</a>
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

  &__container {
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    padding: 130px 10px;
    padding-bottom: 40px;
    min-height: 100vh;

    @media (min-width: 992px) {
      padding-bottom: 130px;
    }
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
        font-family: Agency FB Cyrillic, Roboto, Arial, sans-serif;

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
        font-family: Agency FB Cyrillic, Roboto, Arial, sans-serif;
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

      .btn__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-family: Roboto, Arial, sans-serif;
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 500;
        width: 100%;

        @media (min-width: 440px) {
          text-align: left;
          flex-direction: row;
          justify-content: center;
        }

        @media (min-width: 990px) {
          text-align: left;
          flex-direction: row;
          justify-content: flex-start;
        }

        .test-btn {
          padding: 15px 30px;
          border: 2px solid #bd00c6;
          border-radius: 7px;
          color: white;
          background: black;
          text-align: center;
          margin-bottom: 20px;

          @media (min-width: 440px) {
            margin-right: 40px;
            margin-bottom: 0;
          }

          &:hover {
            border: 2px solid #6f00c6;
          }

          &:active {
            color: rgba(255, 255, 255, 0.9);
          }
        }

        .login-btn {
          padding: 17px 30px;
          border-radius: 7px;
          color: black;
          background: linear-gradient(to left, #0900c8 0%, #bd00c6 100%) no-repeat;
          text-align: center;

          @media (min-width: 440px) {
            align-self: flex-start;
          }

          &:hover {
            background: linear-gradient(to right, #0900c8 0%, #bd00c6 100%) no-repeat;
          }

          &:active {
            background: #bd00c6;
          }
        }
      }
    }

    .image__wrapper {
      display: none;

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
        height: 75vh;
      }
    }
  }
}
</style>
